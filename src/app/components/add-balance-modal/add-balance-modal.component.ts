import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-add-balance-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-balance-modal.component.html',
  styleUrls: ['./add-balance-modal.component.css']
})
export class AddBalanceModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() balanceAdded = new EventEmitter<void>();

  balanceForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.balanceForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.balanceForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.transactionService.addBalance(this.balanceForm.value).subscribe({
        next: () => {
                        console.error('success adding balance');

          this.loading = false;
          this.balanceAdded.emit();
        },
        error: (error) => {
            console.error('Error adding balance:', error);
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error al añadir saldo';
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
}
