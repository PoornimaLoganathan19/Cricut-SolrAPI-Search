import { Component, OnInit } from "@angular/core";
import { CategoriesResponse } from "../shared/models/categoriesResponse";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  mp: any;
  categoriesResponse: CategoriesResponse;
  selectedCategoryId: string;
  constructor(private router: Router) {}

  ngOnInit() {}

  showCategoriesPopup() {
    document.getElementById("categoriesPopup").click();
  }

  goToCategory(subCategoryId: string) {
    localStorage.setItem("categoryId", subCategoryId);
    this.router.navigate(["categories", subCategoryId]);
  }
}
