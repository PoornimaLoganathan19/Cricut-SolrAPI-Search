import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/shared/services/user.service";
import { Router } from "@angular/router";
import { MustMatch } from "src/app/helper/must-match.validator";
import { ToastrService } from "ngx-toastr";
import { UserResponse } from "../shared/models/userResponse";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerResponse: UserResponse;
  submitted: boolean = false;
  alphabetic = "^[A-Za-z]{3,50}$";
  email = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  phone = "[0-9]{10,10}";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: [
          "",
          [Validators.required, Validators.pattern(this.alphabetic)]
        ],
        lastName: [
          "",
          [Validators.required, Validators.pattern(this.alphabetic)]
        ],
        phone: ["", [Validators.required, Validators.pattern(this.phone)]],
        userId: ["", [Validators.required, Validators.pattern(this.email)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
        termsAndConditions: ["", [Validators.requiredTrue]]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  get getFormValue() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.userService
      .register(
        this.registerForm.value.firstName,
        this.registerForm.value.lastName,
        this.registerForm.value.userId,
        this.registerForm.value.phone,
        this.registerForm.value.password
      )
      .subscribe(data => {
        this.registerResponse = data;
        if (this.registerResponse) this.router.navigate(["login"]);
        else this.toastr.error("Registration failed");
        console.log(this.registerResponse);
      });
  }
}
