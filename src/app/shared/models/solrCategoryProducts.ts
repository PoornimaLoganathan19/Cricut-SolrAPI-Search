import { SolrProduct } from "./solrProduct";

export class SolrCategoryProducts {
  categoryId: string;
  categoryName: string;
  url: string;
  description: string;
  basePrice: number;
  _childDocuments_: SolrProduct[];
}
