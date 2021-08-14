import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTwoDigitDecimalNum]'
})
export class TwoDigitDecimalNumDirective {
   // Accept numbers to be inputed with two digit decimal values
   private readonly regularRegex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
    // Allow key codes for special events
   private readonly specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
   // Alloe key codes for a c v x
   private readonly acvxKeys: Array<string> = ['a', 'c', 'v', 'x'];

  constructor(private elRef: ElementRef) {
  }
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {

    if (
      (this.specialKeys.indexOf(event.key) !== -1) || // Allow special events
      (this.acvxKeys.indexOf(event.key) !== -1 && event.ctrlKey) || // Allow: Ctrl+?
      (this.acvxKeys.indexOf(event.key) !== -1 && event.metaKey) // Allow: Cmd+? (Mac)
    ) {
      return;
    }

    const current: string = this.elRef.nativeElement.value;
    const position = this.elRef.nativeElement.selectionStart;
    const next: string =
      [current.slice(0, position), event.key === 'Decimal'
        ? '.'
        : event.key, current.slice(position)].join('');

    if (next && !String(next).match(this.regularRegex)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
    this.elRef.nativeElement.value = '';

    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    if (!pastedText.match(this.regularRegex)) {
      event.preventDefault();
    }
  }
}
