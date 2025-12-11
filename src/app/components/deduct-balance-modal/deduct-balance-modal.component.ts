import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-deduct-balance-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deduct-balance-modal.component.html',
  styleUrls: ['./deduct-balance-modal.component.css']
})
export class DeductBalanceModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() balanceDeducted = new EventEmitter<void>();

  balanceForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.balanceForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.balanceForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.transactionService.deductBalance(this.balanceForm.value).subscribe({
        next: () => {
          console.log('success deducting balance');
          this.loading = false;
          this.balanceDeducted.emit();
        },
        error: (error) => {
          console.error('Error deducting balance:', error);
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error al deducir saldo';
        }
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }

  get amount() {
    return this.balanceForm.get('amount');
  }

  get description() {
    return this.balanceForm.get('description');
  }
}
