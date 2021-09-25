import { Category } from "./category";
import { Price } from "./price";
import { Group } from "./group";
import { Medias } from "./medias";

export class Product {
  id: string;
  productId: string;
  displayName: string;
  shortDescription: string;
  category: Category;
  price: Price;
  url: string;
  specifications: Group[];
  medias: Medias;
}
