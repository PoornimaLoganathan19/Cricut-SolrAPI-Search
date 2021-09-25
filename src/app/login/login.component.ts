import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { ToastrService } from "ngx-toastr";
import { User } from "../shared/models/user";
import { CartService } from "../shared/services/cart.service";
import { CartResponse } from "../shared/models/cartResponse";
import { LoginResponse } from "../shared/models/loginResponse";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  closeResult: string;
  submitted: boolean = false;
  loginResponse: LoginResponse;
  error: boolean;
  cartResponse: CartResponse;
  products: string[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get getFormValue() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userService
      .login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(data => {
        this.loginResponse = data;
        console.log(this.loginResponse);
        if (this.loginResponse.data) {
          localStorage.setItem("userId", this.loginForm.value.userName);
          localStorage.setItem("token", this.loginResponse.token);
          var fullName =
            this.loginResponse.data.firstName +
            " " +
            this.loginResponse.data.lastName;
          localStorage.setItem("userName", fullName);
          document.getElementById("loggedOut").style.display = "none";
          document.getElementById("loggedIn").style.display = "inherit";
          document.getElementById("userInitial").innerHTML = fullName
            .substring(0, 1)
            .toUpperCase();
          document.getElementById("userFullName").innerHTML = fullName;
          this.cartService.getCart().subscribe(data => {
            this.cartResponse = data;
            console.log(this.cartResponse);
            if (this.cartResponse.data) {
              document.getElementById("cartNumber").style.display = "block";
              document.getElementById(
                "cartNumber"
              ).innerHTML = this.cartResponse.data.totalItems.toString();
              localStorage.setItem("showCart", "true");
            } else {
              document.getElementById("cartNumber").style.display = "none";
              localStorage.setItem("showCart", "false");
            }
          });

          if (localStorage.getItem("afterAddToCart")) {
            this.addToCart();
          } else this.router.navigate([""]);
        } else {
          this.toastr.error("Login Failure");
        }
      });
  }

  addToCart() {
    this.cartService
      .addToCart(
        localStorage.getItem("productId"),
        Number(localStorage.getItem("quantity"))
      )
      .subscribe(data => {
        this.cartResponse = data;
        console.log(this.cartResponse);
        localStorage.setItem(
          "cartNumber",
          this.cartResponse.data.totalItems.toString()
        );
        document.getElementById("cartNumber").style.display = "block";
        document.getElementById(
          "cartNumber"
        ).innerHTML = this.cartResponse.data.totalItems.toString();
        this.router.navigate(["cart"]);
      });
  }
}
