import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Document, GenerateDocumentRequest } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<{ documents: Document[] }> {
    return this.http.get<{ documents: Document[] }>(`${this.apiUrl}/documents`);
  }

  generateDocument(data: GenerateDocumentRequest): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/documents/generate`, data);
  }
}
