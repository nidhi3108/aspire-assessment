export type CardStatus = 'active' | 'frozen';

export interface Transaction {
  id: string;
  cardId: string;
  description: string;
  amount: number;
  merchant: string;
  occurredAt: string;
}

export interface Card {
  id: string;
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  status: CardStatus;
  createdAt: string;
  transactions: Transaction[];
}
