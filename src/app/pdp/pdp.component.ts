import { Component, OnInit } from "@angular/core";
import { ProductResponse } from "../shared/models/productResponse";
import { ProductService } from "../shared/services/product.service";
import { mediaProperties } from "../shared/mediaProperties";
import { CartService } from "../shared/services/cart.service";
import { CartResponse } from "../shared/models/cartResponse";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
import { siteProperties } from "../shared/siteProperties";

@Component({
  selector: "app-pdp",
  templateUrl: "./pdp.component.html",
  styleUrls: ["./pdp.component.scss"]
})
export class PdpComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  productResponse: ProductResponse;
  specsResponse: ProductResponse;
  mp: any;
  quantity: number;
  currency: string;
  cartResponse: CartResponse;
  addToCartForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mp = mediaProperties;
    this.currency = siteProperties.currency;

    this.addToCartForm = this.formBuilder.group({
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)]
      ]
    });

    this.getProduct();
    this.getSpecs();

    this.galleryOptions = [
      {
        width: "100%",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [];
  }

  getProduct() {
    this.productService.getProduct().subscribe(data => {
      this.productResponse = data;
      this.productResponse.data.url = this.productResponse.data.medias.hero[0].url;
      this.productResponse.data.medias.hero.forEach(media => {
        this.galleryImages.push({
          small: media.url,
          medium: media.url,
          big: media.url
        });
      });
      console.log(this.productResponse);
    });
  }

  getSpecs() {
    this.productService.getProductSpecifications().subscribe(data => {
      this.specsResponse = data;
      console.log(this.specsResponse);
    });
  }

  minusQuantity() {
    if (this.addToCartForm.value.quantity <= 1)
      this.addToCartForm.controls.quantity.setValue(1);
    else
      this.addToCartForm.controls.quantity.setValue(
        this.addToCartForm.controls.quantity.value - 1
      );
  }

  addQuantity() {
    if (this.addToCartForm.value.quantity >= 100)
      this.addToCartForm.controls.quantity.setValue(100);
    else
      this.addToCartForm.controls.quantity.setValue(
        this.addToCartForm.controls.quantity.value + 1
      );
  }

  get getFormValue() {
    return this.addToCartForm.controls;
  }

  addToCart() {
    this.submitted = true;
    console.log(this.addToCartForm);
    if (this.addToCartForm.invalid) {
      console.log(this.getFormValue.quantity.errors);
      return;
    }
    this.quantity = this.addToCartForm.value.quantity;
    console.log(this.quantity);
    if (localStorage.getItem("userId")) {
      this.cartService
        .addToCart(this.productResponse.data.productId, this.quantity)
        .subscribe(data => {
          this.cartResponse = data;
          console.log(this.cartResponse);
          document.getElementById("cartNumber").style.display = "block";
          document.getElementById(
            "cartNumber"
          ).innerHTML = this.cartResponse.data.totalItems.toString();
          this.router.navigate(["cart"]);
        });
    } else {
      localStorage.setItem("afterAddToCart", "true");
      localStorage.setItem("quantity", this.quantity.toString());
      this.router.navigate(["login"]);
    }
  }
}
