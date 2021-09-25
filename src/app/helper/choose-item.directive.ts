import { Directive, HostListener, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[choose-item]"
})
export class ChooseItemDirective {
  parentContentList: any;

  constructor(public elementRef: ElementRef) {}

  @Input("choose-item") currentCatagoryId: any;

  @HostListener("click") onclick() {
    this.parentContentList = document.getElementsByClassName(
      "item-" + this.currentCatagoryId
    );
    for (let i = 0; i < this.parentContentList.length; i++) {
      this.parentContentList[i].children[1].classList.remove("selected");
    }
    this.elementRef.nativeElement.childNodes[1].classList.add("selected");
  }
}
