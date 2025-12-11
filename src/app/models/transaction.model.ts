export interface Transaction {
  _id?: string;
  userId: string;
  type: 'recharge' | 'expense';
  amount: number;
  description: string;
  createdAt: Date;
}

export interface AddBalanceRequest {
  amount: number;
}
