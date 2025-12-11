import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { DocumentService } from '../../services/document.service';
import { User } from '../../models/user.model';
import { Transaction } from '../../models/transaction.model';
import { Document } from '../../models/document.model';
import { AddBalanceModalComponent } from '../add-balance-modal/add-balance-modal.component';
import { DeductBalanceModalComponent } from '../deduct-balance-modal/deduct-balance-modal.component';
import { GenerateDocumentModalComponent } from '../generate-document-modal/generate-document-modal.component';
import { StatisticsComponent } from '../statistics/statistics.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AddBalanceModalComponent, DeductBalanceModalComponent, GenerateDocumentModalComponent, StatisticsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  balance: number = 0;
  transactions: Transaction[] = [];
  documents: Document[] = [];
  loading = true;
  showAddBalanceModal = false;
  showDeductBalanceModal = false;
  showGenerateDocumentModal = false;

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadBalance();
    this.loadTransactions();
    this.loadDocuments();
  }

  loadUserData(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  loadBalance(): void {
    this.transactionService.getBalance().subscribe({
      next: (response) => {
        this.balance = response.balance.amount;
        if (this.user) {
          this.user.balance = response.balance.amount;
          this.authService.updateCurrentUser(this.user);
        }
      },
      error: (error) => console.error('Error loading balance:', error)
    });
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (response) => {
        this.transactions = response.transactions.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.loading = false;
      }
    });
  }

  loadDocuments(): void {
    this.documentService.getDocuments().subscribe({
      next: (response) => {
        this.documents = response.documents.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ).slice(0, 5);
      },
      error: (error) => console.error('Error loading documents:', error)
    });
  }

  openAddBalanceModal(): void {
    this.showAddBalanceModal = true;
  }

  closeAddBalanceModal(): void {
    this.showAddBalanceModal = false;
  }

  onBalanceAdded(): void {
    this.loadBalance();
    this.loadTransactions();
    this.closeAddBalanceModal();
  }

  openDeductBalanceModal(): void {
    this.showDeductBalanceModal = true;
  }

  closeDeductBalanceModal(): void {
    this.showDeductBalanceModal = false;
  }

  onBalanceDeducted(): void {
    this.loadBalance();
    this.loadTransactions();
    this.closeDeductBalanceModal();
  }

  openGenerateDocumentModal(): void {
    this.showGenerateDocumentModal = true;
  }

  closeGenerateDocumentModal(): void {
    this.showGenerateDocumentModal = false;
  }

  onDocumentGenerated(): void {
    this.loadDocuments();
    this.closeGenerateDocumentModal();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getTransactionIcon(type: string): string {
    return type === 'recharge' ? '↑' : '↓';
  }

  getTransactionClass(type: string): string {
    return type === 'recharge' ? 'transaction-income' : 'transaction-expense';
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'pending': 'status-pending',
      'generated': 'status-success',
      'failed': 'status-error'
    };
    return classes[status] || '';
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'pending': 'Pendiente',
      'generated': 'Generado',
      'failed': 'Fallido'
    };
    return texts[status] || status;
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
