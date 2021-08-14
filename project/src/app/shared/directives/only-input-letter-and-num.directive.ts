import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyInputLetterAndNum]'
})
export class OnlyInputLetterAndNumDirective {
     // Accept only numbers and letters to be inputed
     private readonly kdownRegex: RegExp = new RegExp(/^[0-9A-Za-z\u4E00-\u9FA5]{1,12}$/g);
     // Accept only chinese charactors to be inputed
     private readonly kupRegex: RegExp = new RegExp(/^[^0-9A-Za-z\u4E00-\u9FA5]{1,12}/g);
     // Allow key codes for special events
     private readonly specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
     // Alloe key codes for a c v x
     private readonly acvxKeys: Array<string> = ['a', 'c', 'v', 'x'];

    constructor(
      private readonly elRef: ElementRef
    ) { }

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
      if (
        (this.specialKeys.indexOf(event.key) !== -1) || // Allow special events
        (this.acvxKeys.indexOf(event.key) !== -1 && event.ctrlKey) || // Allow: Ctrl+?
        (this.acvxKeys.indexOf(event.key) !== -1 && event.metaKey) // Allow: Cmd+? (Mac)
      ) {
        return;
      }

      const value = this.elRef.nativeElement.value as string;
      const nextVal: string = [value, event.key].join('');

      if (!nextVal.match(this.kdownRegex)) {
        event.preventDefault();
      }
    }

    @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent): void {
      if (
        (this.specialKeys.indexOf(event.key) !== -1) || // Allow special events
        (this.acvxKeys.indexOf(event.key) !== -1 && event.ctrlKey) || // Allow: Ctrl+?
        (this.acvxKeys.indexOf(event.key) !== -1 && event.metaKey) // Allow: Cmd+? (Mac)
      ) {
        return;
      }

      const value = this.elRef.nativeElement.value as string;
      this.elRef.nativeElement.value = value.replace(this.kupRegex,'');
    }

    @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
      // this.elRef.nativeElement.value = '';

      const clipboardData = event.clipboardData;
      const pastedText = clipboardData.getData('text');

      if (!pastedText.match(this.kdownRegex)) {
        event.preventDefault();
      }
    }
}
