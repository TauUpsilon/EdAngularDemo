import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-ccy-amt-input',
  templateUrl: './ccy-amt-input.component.html',
  styleUrls: ['./ccy-amt-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CcyAmtInputComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CcyAmtInputComponent
    }
  ]
})
export class CcyAmtInputComponent implements OnChanges, ControlValueAccessor, Validator {

  @Input() value: any = '';
  @Input() decimalPlace = 0;
  @Input() placeholder = '';
  @Input() minAmt = 0;
  @Input() maxAmt: number;

  @ViewChild('ccyAmtInput') ccyAmtInput: ElementRef;

  regex: RegExp;

  disabled = false;

  formCtrlVal: any;

  doChange: any = () => { };
  doTouched: any = () => { };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes)
      .forEach(propName => {
        if (changes.hasOwnProperty(propName)) {
          switch (propName) {
            case 'value':
              this.value =
                this.setValueFormat(changes[propName].currentValue.toString());
              break;

            case 'decimalPlace':
              this.decimalPlace = changes[propName].currentValue;
              break;

            case 'minAmt':
              this.minAmt = changes[propName].currentValue;
              break;

            case 'maxAmt':
              this.maxAmt = changes[propName].currentValue;
              break;

            default:
              break;
          }
        }
      });
  }

  // ngAfterViewInit(): void {
  //   if (this.device.platform === 'iOS' && parseInt(this.device.version, 10) <= 12) {
  //     this.renderer.setAttribute(this.ccyAmtInput.nativeElement, 'inputmode', 'numeric');
  //   } else {
  //     this.renderer.setAttribute(this.ccyAmtInput.nativeElement, 'inputmode', 'decimal');
  //   }

  //   this.renderer.setAttribute(this.ccyAmtInput.nativeElement, 'pattern', '\\d*');
  // }


  onKeyUp(event: any) {
    const currentCaretPosition = event.target.selectionStart;
    const currentValLength = event.target.value
      .toString()
      .length;
    const currentVal = event.target.value
      .toString()
      .replace(/,/g, '');

    this.value = this.setValueFormat(currentVal);

    if (currentCaretPosition !== currentValLength) {
      setTimeout(() => {
        this.ccyAmtInput.nativeElement
          .setSelectionRange(currentCaretPosition, currentCaretPosition);
      }, 50);
    }

    this.formCtrlVal = currentVal;
    this.doChange(Number(this.formCtrlVal));
  }

  writeValue(value: any): void {
    // form 表單清空會是null
    if (value) {
      this.value = this.setValueFormat(value);
      this.formCtrlVal = value;
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.doChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.doTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setValueFormat(value: string): string {
    const regex = new RegExp(`(\\d)(?=(?:\\d{3})+(?:\\.|$))|(\\.\\d{0,${this.decimalPlace}})$`, 'g');

    return value.replace(regex, (_, s1, s2) => {
      return s2 || (s1 + ',');
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const amt = control.value;

    if (amt < this.minAmt || amt > this.maxAmt) {
      return {
        mustBePositive: {
          amt
        }
      };
    }
  }
}
