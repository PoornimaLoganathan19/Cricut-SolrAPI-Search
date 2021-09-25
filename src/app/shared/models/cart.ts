import { Entry } from "./entry";
import { Address } from "./address";
import { PaymentInfo } from "./paymentInfo";

export class Cart {
  id: string;
  totalItems: number;
  totalPrice: number;
  totalTax: number;
  totalPriceWithTax: number;
  status: string;
  shippingAddress: Address;
  paymentInfos: PaymentInfo[];
  entries: Entry[];
}
