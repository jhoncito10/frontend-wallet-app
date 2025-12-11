import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-generate-document-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-document-modal.component.html',
  styleUrls: ['./generate-document-modal.component.css']
})
export class GenerateDocumentModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() documentGenerated = new EventEmitter<void>();

  documentForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService
  ) {
    this.documentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.documentService.generateDocument(this.documentForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.documentGenerated.emit();
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error al generar documento';
        }
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }

  get name() {
    return this.documentForm.get('name');
  }
}
