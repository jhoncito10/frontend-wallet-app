import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction.model';

interface ChartDataPoint {
  date: string;
  balance: number;
  displayDate: string;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];
  @Input() currentBalance: number = 0;

  totalIncome: number = 0;
  totalExpenses: number = 0;
  chartData: ChartDataPoint[] = [];
  maxBalance: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] || changes['currentBalance']) {
      this.calculateStatistics();
      this.generateChartData();
    }
  }

  calculateStatistics(): void {
    this.totalIncome = this.transactions
      .filter(t => t.type === 'recharge')
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalExpenses = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  generateChartData(): void {
    if (this.transactions.length === 0) {
      this.chartData = [];
      return;
    }

    // Ordenar transacciones por fecha
    const sortedTransactions = [...this.transactions].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Calcular balance acumulado
    let runningBalance = 0;
    const dataPoints: ChartDataPoint[] = [];

    sortedTransactions.forEach((transaction, index) => {
      if (transaction.type === 'recharge') {
        runningBalance += transaction.amount;
      } else {
        runningBalance -= transaction.amount;
      }

      const date = new Date(transaction.createdAt);
      dataPoints.push({
        date: date.toISOString(),
        balance: runningBalance,
        displayDate: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
      });
    });

    // Tomar los últimos 10 puntos para el gráfico
    this.chartData = dataPoints.slice(-10);
    this.maxBalance = Math.max(...this.chartData.map(d => d.balance), this.currentBalance);
  }

  getBarHeight(balance: number): number {
    if (this.maxBalance === 0) return 10;
    const percentage = (balance / this.maxBalance) * 90;
    return Math.max(percentage, 10);
  }
}
