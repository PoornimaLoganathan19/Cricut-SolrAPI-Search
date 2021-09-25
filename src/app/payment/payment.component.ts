import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CardResponse } from "../shared/models/cardResponse";
import { SimpleResponse } from "../shared/models/simpleResponse";
import { UserService } from "../shared/services/user.service";
import { CartService } from "../shared/services/cart.service";
import { CardListResponse } from "../shared/models/cardListResponse";
import { ModalDirective } from "angular-bootstrap-md";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit {
  @ViewChild("addCardModal") addCardModal: ModalDirective;

  paymentForm: FormGroup;
  cvvForm: FormGroup;
  nameFormat = "[A-Z,a-z]{3,50}";
  cardNumFormat = "[0-9]{16,16}";
  expMonthFormat = "[0-9]{2,2}";
  expYearFormat = "[0-9]{4,4}";
  cvvFormat = "[0-9]{3,3}";
  submitted: boolean = false;
  cvvSubmitted: boolean = false;
  cardId: string;
  addCardResponse: CardResponse;
  checkoutPaymentResponse: SimpleResponse;
  cardListResponse: CardListResponse;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cartService: CartService,
    private toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      firstName: [
        "",
        [Validators.required, Validators.pattern(this.nameFormat)]
      ],
      lastName: [
        "",
        [Validators.required, Validators.pattern(this.nameFormat)]
      ],
      cardNumber: [
        "",
        [Validators.required, Validators.pattern(this.cardNumFormat)]
      ],
      cvv: ["", [Validators.required, Validators.pattern(this.cvvFormat)]],
      expiryMonth: [
        "",
        [
          Validators.required,
          Validators.pattern(this.expMonthFormat),
          Validators.min(1),
          Validators.max(12)
        ]
      ],
      expiryYear: [
        "",
        [
          Validators.required,
          Validators.pattern(this.expYearFormat),
          Validators.min(2020),
          Validators.max(2030)
        ]
      ]
    });
    this.cvvForm = this.formBuilder.group({
      cvv: ["", [Validators.required, Validators.pattern(this.cvvFormat)]]
    });
    this.getCards();
  }

  get getPaymentFormValue() {
    return this.paymentForm.controls;
  }
  get getCvvFormValue() {
    return this.cvvForm.controls;
  }
  addCard() {
    this.submitted = true;
    if (this.paymentForm.invalid) {
      return;
    }
    this.userService
      .addCard(
        this.paymentForm.value.cardNumber,
        this.paymentForm.value.expiryMonth,
        this.paymentForm.value.expiryYear,
        this.paymentForm.value.cvv,
        this.paymentForm.value.firstName,
        this.paymentForm.value.lastName
      )
      .subscribe(data => {
        this.addCardResponse = data;
        console.log(this.addCardResponse);
        if (this.addCardResponse.data) {
          localStorage.setItem(
            "cardId",
            this.addCardResponse.data.id.toString()
          );
          this.getCards();
          this.addCardModal.hide();
        } else this.toastr.error("Card already exists.");
      });
  }

  getCards() {
    this.userService.getCardList().subscribe(data => {
      this.cardListResponse = data;
      console.log(this.cardListResponse);
      if (this.cardListResponse.data && this.cardListResponse.data.length > 0) {
        if (localStorage.getItem("cardId"))
          this.cardId = localStorage.getItem("cardId");
        else this.cardId = this.cardListResponse.data[0].id.toString();
      } else return;
    });
  }

  maskCardNumber(cardNumber: string) {
    return (
      cardNumber.substring(0, 2) + "************" + cardNumber.substring(14, 16)
    );
  }

  checkoutPayment() {
    this.cvvSubmitted = true;
    if (this.cvvForm.invalid) {
      console.log(this.cvvForm);
      return;
    }
    this.cartService
      .addPaymentToCart(
        Number(this.cardId),
        Number(localStorage.getItem("amount"))
      )
      .subscribe(data => {
        this.checkoutPaymentResponse = data;
        console.log(this.checkoutPaymentResponse);
        localStorage.setItem("cardId", this.cardId);
        localStorage.removeItem("amount");
        this.router.navigate(["review"]);
      });
  }
}
