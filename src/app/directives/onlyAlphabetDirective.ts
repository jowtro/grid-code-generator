import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTextOnly]'
})
export class OnlyAlphabetDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event): void {
    const initalValue = this.el.nativeElement.value;

    this.el.nativeElement.value = initalValue.replace(/[^a-z]|[A-Z]*/g, '');
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
