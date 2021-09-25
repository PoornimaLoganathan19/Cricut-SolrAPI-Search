import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProductListComponent } from "src/app/product-list/product-list.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { ReviewComponent } from "./review/review.component";
import { PdpComponent } from "./pdp/pdp.component";
import { CategoryComponent } from "./category/category.component";
import { CartComponent } from "./cart/cart.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { PaymentComponent } from "./payment/payment.component";
import { OrderComponent } from "./order/order.component";
import { SearchResultComponent } from "./search-result/search-result.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "search", component: SearchComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "list", component: ProductListComponent },
  { path: "shipping", component: ShippingComponent },
  { path: "payment", component: PaymentComponent },
  { path: "review", component: ReviewComponent },
  { path: "searchresult", component: SearchResultComponent },
  { path: "confirm", component: ConfirmComponent },
  { path: "categories/:id", component: CategoryComponent },
  { path: "products/:id", component: PdpComponent },
  { path: "cart", component: CartComponent },
  { path: "orders/:id", component: OrderComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
