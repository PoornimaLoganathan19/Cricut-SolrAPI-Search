// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  // SOLR URLs
  solrApiUrl: "http://172.31.4.91:8983/solr",
  productsSearchUrl: "/cricutsearch",
  categoryProductsSearchUrl: "/cricut_category_search",
  categoriesSearchUrl: "/cricut_categories_search",
  selectUrl: "/select?indent=on&q=",
  searchReturnType: "&wt=json",
  priceSort: "&sort=priceValue asc",
  facetUrl: "&facet=on&facet.field=color",
  categoryFilterQuery:
    "&fq={!parent which=$parent_filter}&fl=*,[child parentFilter=$parent_filter]&parent_filter=content_type:category&defType=edismax",
  // ComPaaS URLs
  apiUrl: "http://172.31.4.91:8095/api",
  userUrl: "/user",
  authenticateUrl: "/authenticate",
  addressUrl: "/address",
  addressesUrl: "/addresses",
  creditcardUrl: "/creditcard",
  creditCardsUrl: "/creditCards",
  productUrl: "/product",
  specsUrl: "/specifications",
  keyValueUrl: "/keyValue",
  localeQuery: "locale=",
  specTypeQuery: "specType=",
  entityTypeQuery: "entityType=",
  cartUrl: "/cart",
  addToCartUrl: "/add2cart",
  currentCartUrl: "/currentCart",
  deliveryModesUrl: "/deliveryModes",
  checkoutUrl: "/checkout",
  shippingUrl: "/shipping",
  paymentUrl: "/payment",
  placeOrderUrl: "/placeOrder",
  orderUrl: "/order",
  logoutUrl: "/logout",
  tokenUrl: "/token",
  refreshTokenUrl: "/refreshToken"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
