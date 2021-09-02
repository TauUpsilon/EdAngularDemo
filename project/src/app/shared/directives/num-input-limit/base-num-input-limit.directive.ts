import { Directive, ElementRef, HostListener } from '@angular/core';
import { BaseNumInputLimitInterface } from './base-num-input-limit.interface';

@Directive({})
export class BaseNumInputLimitDirective implements BaseNumInputLimitInterface {
  // Accept numbers to be inputed with two digit decimal values
  protected regularRegex: RegExp;
  // Allow key codes for special events
  protected readonly specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  // Alloe key codes for a c v x
  protected readonly acvxKeys: Array<string> = ['a', 'c', 'v', 'x'];

  constructor(readonly elRef: ElementRef) { }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
    this.elRef.nativeElement.value = '';

    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    if (pastedText && !pastedText.match(this.regularRegex)) {
      event.preventDefault();
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    if (
      (this.specialKeys.indexOf(event.key) !== -1) || // Allow special events
      (this.acvxKeys.indexOf(event.key) !== -1 && event.ctrlKey) || // Allow: Ctrl+?
      (this.acvxKeys.indexOf(event.key) !== -1 && event.metaKey) // Allow: Cmd+? (Mac)
    ) {
      return;
    }

    this.performKeyDown(event);
  }

  performKeyDown(event: KeyboardEvent): void {
    throw new Error('Method not implemented.');
  }
}
