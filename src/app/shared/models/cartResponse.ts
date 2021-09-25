import { Cart } from "./cart";

export class CartResponse {
  data: Cart;
  technicalError: string;
  businessError: string;
}
