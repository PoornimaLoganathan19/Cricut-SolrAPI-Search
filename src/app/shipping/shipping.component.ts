import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "../shared/services/user.service";
import { AddressResponse } from "../shared/models/addressResponse";
import { CartService } from "../shared/services/cart.service";
import { DeliveryModesResponse } from "../shared/models/deliveryModesResponse";
import { SimpleResponse } from "../shared/models/simpleResponse";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ModalDirective } from "angular-bootstrap-md";
import { AddressListResponse } from "../shared/models/addressListResponse";

@Component({
  selector: "app-shipping",
  templateUrl: "./shipping.component.html",
  styleUrls: ["./shipping.component.scss"]
})
export class ShippingComponent implements OnInit {
  @ViewChild("addAddressModal") addAddressModal: ModalDirective;
  shippingAddressForm: FormGroup;
  nameFormat = "[A-z,a-z]{3,50}";
  zipCodeFormat = "[0-9]{5,5}";
  submitted = false;
  addAddressResponse: AddressResponse;
  addressId: string;
  deliveryModesResponse: DeliveryModesResponse;
  deliveryModeId: number;
  checkoutAddressResponse: SimpleResponse;
  addressListResponse: AddressListResponse;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cartService: CartService,
    public router: Router
  ) {}

  ngOnInit() {
    this.shippingAddressForm = this.formBuilder.group({
      firstName: [
        "",
        [Validators.required, Validators.pattern(this.nameFormat)]
      ],
      lastName: [
        "",
        [Validators.required, Validators.pattern(this.nameFormat)]
      ],
      line1: ["", Validators.required],
      line2: ["", Validators.required],
      town: ["", [Validators.required, Validators.pattern(this.nameFormat)]],
      postalCode: [
        "",
        [Validators.required, Validators.pattern(this.zipCodeFormat)]
      ],
      country: ["", Validators.required],
      state: ["", Validators.required]
    });
    this.getAddresses();
    this.getDeliveryModes();
  }

  get getAddressFormValue() {
    return this.shippingAddressForm.controls;
  }

  addAddress() {
    this.submitted = true;
    if (this.shippingAddressForm.invalid) {
      console.log(this.shippingAddressForm);
      return;
    }
    this.userService
      .addAddress(
        this.shippingAddressForm.value.firstName,
        this.shippingAddressForm.value.lastName,
        this.shippingAddressForm.value.line1,
        this.shippingAddressForm.value.line2,
        this.shippingAddressForm.value.town,
        this.shippingAddressForm.value.postalCode,
        this.shippingAddressForm.value.state,
        this.shippingAddressForm.value.country
      )
      .subscribe(data => {
        this.addAddressResponse = data;
        console.log(this.addAddressResponse);
        localStorage.setItem(
          "addressId",
          this.addAddressResponse.data.id.toString()
        );
        this.getAddresses();
        this.addAddressModal.hide();
      });
  }

  getAddresses() {
    this.userService.getAddressList().subscribe(data => {
      this.addressListResponse = data;
      console.log(this.addressListResponse);
      if (this.addressListResponse.data.length > 0) {
        if (localStorage.getItem("addressId"))
          this.addressId = localStorage.getItem("addressId");
        else this.addressId = this.addressListResponse.data[0].id.toString();
      } else return;
    });
  }

  getDeliveryModes() {
    this.cartService.getDeliveryModes().subscribe(data => {
      this.deliveryModesResponse = data;
      console.log(this.deliveryModesResponse);
      this.deliveryModeId = this.deliveryModesResponse.data[0].deliveryModeId;
    });
  }

  checkoutAddress() {
    if (!this.addressId) return;
    console.log(this.addressId);
    this.cartService
      .addAddressToCart(Number(this.addressId), this.deliveryModeId)
      .subscribe(data => {
        this.checkoutAddressResponse = data;
        console.log(this.checkoutAddressResponse);
        localStorage.setItem("addressId", this.addressId);
        if (localStorage.getItem("fromReview")) {
          localStorage.removeItem("fromReview");
          this.router.navigate(["review"]);
        } else this.router.navigate(["payment"]);
      });
  }
}
