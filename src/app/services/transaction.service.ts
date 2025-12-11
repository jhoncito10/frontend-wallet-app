import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transaction, AddBalanceRequest } from '../models/transaction.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getTransactions(): Observable<{ transactions: Transaction[] }> {
    return this.http.get<{ transactions: Transaction[] }>(`${this.apiUrl}/transactions`);
  }

  getBalance(): Observable<{ balance: { amount: number } }> {
    return this.http.get<{ balance: { amount: number } }>(`${this.apiUrl}/transactions/balance`);
  }

  addBalance(data: AddBalanceRequest): Observable<{ newBalance: number }> {
    return this.http.post<{ newBalance: number }>(`${this.apiUrl}/transactions/add-balance`, data).pipe(
      tap(response => {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          currentUser.balance = response.newBalance;
          this.authService.updateCurrentUser(currentUser);
        }
      })
    );
  }

  deductBalance(data: { amount: number; description: string }): Observable<{ newBalance: number }> {
    return this.http.post<{ newBalance: number }>(`${this.apiUrl}/transactions/deduct-balance`, data).pipe(
      tap(response => {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          currentUser.balance = response.newBalance;
          this.authService.updateCurrentUser(currentUser);
        }
      })
    );
  }
}
