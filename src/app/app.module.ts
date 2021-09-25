import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {
  MDBBootstrapModule,
  WavesModule,
  ModalModule,
  CarouselModule
} from "angular-bootstrap-md";
import { AgmCoreModule } from "@agm/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { LoginComponent } from "./login/login.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { HoverClassDirective } from "./helper/hover-class.directive";
import { RegisterComponent } from "./register/register.component";
import { NguCarouselModule } from "@ngu/carousel";
import { PopoverModule } from "ngx-smart-popover";
import { CollapsibleModule } from "angular2-collapsible";
import { Ng5SliderModule } from "ng5-slider";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ChangeConfigDirective } from "src/app/helper/change-config.directive";
import { ChooseItemDirective } from "src/app/helper/choose-item.directive";
import { ExtandClassDirective } from "src/app/helper/extand-class.directive";
import { NgxGalleryModule } from "ngx-gallery";
import { DragScrollModule } from "ngx-drag-scroll";
import { ToastrModule } from "ngx-toastr";
import { ConfirmComponent } from "./confirm/confirm.component";
import { ReviewComponent } from "./review/review.component";
import { PdpComponent } from "./pdp/pdp.component";
import { CategoryComponent } from "./category/category.component";
import { CartComponent } from "./cart/cart.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { PaymentComponent } from "./payment/payment.component";
import { OrderComponent } from "./order/order.component";
import { httpInterceptorProviders } from "./shared/http-interceptors";
import { SearchResultComponent } from "./search-result/search-result.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    ProductListComponent,
    HoverClassDirective,
    RegisterComponent,
    ChangeConfigDirective,
    ChooseItemDirective,
    ExtandClassDirective,
    ConfirmComponent,
    ReviewComponent,
    PdpComponent,
    CategoryComponent,
    CartComponent,
    ShippingComponent,
    PaymentComponent,
    OrderComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    WavesModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    NgxGalleryModule,
    CarouselModule,
    HttpClientModule,
    NguCarouselModule,
    DragScrollModule,
    Ng5SliderModule,
    PopoverModule,
    CollapsibleModule,
    ToastrModule.forRoot({ positionClass: "toast-top-center" })
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
