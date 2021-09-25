import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[change-config]'
})
export class ChangeConfigDirective {
  mainCatagoryList: any;
  subCatagoryList: any;
  constructor(public elementRef: ElementRef) {}
  @Input('change-config') changeConfig: any;

  @HostListener('click') onclick() {
    this.mainCatagoryList = document.getElementsByClassName('config-item');
    for (let i = 0; i < this.mainCatagoryList.length; i++) {
      this.mainCatagoryList[i].classList.remove('active');
    }

    // this.subCatagoryList = document.getElementsByClassName('config-sub-bar');

    // for (var i = 0; i < this.subCatagoryList.length; i++) {
    //   this.subCatagoryList[i].style.display = 'none';
    // }

    // document.getElementById('subBar-' + this.changeConfig).style.display =
    //   'flex';
    this.elementRef.nativeElement.classList.add('active');
  }
}
