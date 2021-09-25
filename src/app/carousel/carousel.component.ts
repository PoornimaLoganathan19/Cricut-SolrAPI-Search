import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CarouselComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    document.getElementById("video1")["muted"] = "muted";
    document.getElementById("video2")["muted"] = "muted";
    document.getElementById("video3")["muted"] = "muted";
    document.getElementById("video4")["muted"] = "muted";
  }
  goToCategory(subCategoryId: string) {
    localStorage.setItem("categoryId", subCategoryId);
    this.router.navigate(["categories", subCategoryId]);
  }
}
