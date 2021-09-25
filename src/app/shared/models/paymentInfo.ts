import { Card } from "./card";

export class PaymentInfo {
  id: number;
  paymentType: string;
  creditCard: Card;
  amount: number;
  status: string;
  transactionDate: string;
}
