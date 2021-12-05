import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({})
export abstract class BaseInputLimitDirective {
  // Accept numbers to be inputted with two digit decimal values
  protected regularRegex: RegExp;
  // Allow key codes for special events
  protected readonly specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  // Allow key codes for a c v x
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

  @HostListener('compositionstart', ['$event']) onCompositionStart(event: CompositionEvent): void {
    this.performCompositionStart(event);
  }

  @HostListener('compositionupdate', ['$event']) onCompositionUpdate(event: CompositionEvent): void {
    this.performCompositionUpdate(event);
  }

  @HostListener('compositionend', ['$event']) onCompositionEnded(event: CompositionEvent): void {
    this.performCompositionEnded(event);
  }

  abstract performKeyDown(event: KeyboardEvent): void;

  abstract performCompositionStart(event: CompositionEvent): void;

  abstract performCompositionUpdate(event: CompositionEvent): void;

  abstract performCompositionEnded(event: CompositionEvent): void;

  private tryPerform(performMethod: (e: Event) => void, event: Event): void {
    try{
      performMethod(event);
    } catch (e) {
      console.log(e);
    }
  }
}
