export interface Document {
  _id?: string;
  userId: string;
  name: string;
  status: 'pending' | 'generated' | 'failed';
  createdAt: Date;
}

export interface GenerateDocumentRequest {
  name: string;
}
