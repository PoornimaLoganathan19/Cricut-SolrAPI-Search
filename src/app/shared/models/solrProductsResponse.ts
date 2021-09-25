import { solrProductDoc } from "./solrProductDoc";
import { FacetCounts } from "./facetCounts";

export class SolrProductsResponse {
  facet_counts: FacetCounts;
  response: solrProductDoc;
}
