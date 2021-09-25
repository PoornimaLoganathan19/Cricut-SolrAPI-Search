import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[extand-class]'
})
export class ExtandClassDirective {
  constructor(public elementRef: ElementRef) {}
  @Input('extand-class') extandClass: any;

  @HostListener('click') onclick() {
    if (this.elementRef.nativeElement.children[0].classList[1] == 'fa-minus') {
      this.elementRef.nativeElement.children[0].classList.remove('fa-minus');
      this.elementRef.nativeElement.children[0].classList.add('fa-plus');
    } else {
      this.elementRef.nativeElement.children[0].classList.remove('fa-plus');
      this.elementRef.nativeElement.children[0].classList.add('fa-minus');
    }
    console.log();
    // var els = document.getElementsByClassName('color');
    // for (let i = 0; i < els.length; i++) {
    //   els[i].classList.remove('active');
    // }
    // this.elementRef.nativeElement.classList.add(this.extandClass);
  }
}
