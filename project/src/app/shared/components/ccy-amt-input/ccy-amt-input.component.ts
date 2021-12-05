import { Component, forwardRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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

  @Input() value = '';
  @Input() decimalPlace = 0;
  @Input() placeholder = '';
  @Input() minAmt = 0;
  @Input() maxAmt: number;

  regex: RegExp;

  disabled = false;

  valueOut: any;

  propagateChange: any = () => { };
  propagateTouched: any = () => { };

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

              if (this.decimalPlace > 0) {
                this.regex =
                  new RegExp(`^\\d*\\.?\\d{0,${this.decimalPlace}}$`, 'g');
              } else {
                this.regex =
                  new RegExp(`^\\d*$`, 'g');
              }
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

  onChange(event: any) {
    if (!isNaN(this.valueOut) &&
      Number.isInteger(parseFloat(this.valueOut)) &&
      Number(this.valueOut.split('.')[1]) !== 0) {
        this.value =
          this.setValueFormat(event.target.value.toString());
    }

    this.valueOut = event.target.value.replace(/,/g, '');
    this.propagateChange(Number(this.valueOut));
  }

  // ngAfterViewInit(): void {
  //   if (this.device.platform === 'iOS' && parseInt(this.device.version, 10) <= 12) {
  //     this.renderer.setAttribute(this.ccyAmtInput.nativeElement, 'inputmode', 'numeric');
  //   } else {
  //     this.renderer.setAttribute(this.ccyAmtInput.nativeElement, 'inputmode', 'decimal');
  //   }

  //   this.renderer.setAttribute(this.ccyAmtInput.nativeElement, 'pattern', '\\d*');
  // }

  writeValue(value: any): void {
    // form 表單清空會是null
    if (value) {
      this.value = this.setValueFormat(value);
      this.valueOut = value;
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setValueFormat(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ',');
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
