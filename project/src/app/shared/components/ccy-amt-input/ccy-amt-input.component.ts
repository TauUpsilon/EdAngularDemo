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

  @Input() decimalPlace: number;
  @Input() minAmt: number;
  @Input() maxAmt: number;

  regex: RegExp;

  disabled = false;

  value: any;
  valueDisplay = '';

  propagateChange: any = () => { };
  propagateTouched: any = () => { };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'decimalPlace':
            this.decimalPlace = changes[propName].currentValue;

            if (this.decimalPlace > 0) {
              this.regex = new RegExp(`^\\d*\\.?\\d{0,${this.decimalPlace}}$`, 'g');
            } else {
              this.regex = new RegExp(`^\\d*$`, 'g');
            }
            continue;

          default:
            break;
        }
      }
    }
  }

  onChange(e: any) {
    this.value = e.target.value.replace(/,/g, '');

    if (!isNaN(this.value) &&
      Number.isInteger(parseFloat(this.value)) &&
      Number(this.value.split('.')[1]) !== 0) {

      this.valueDisplay = e.target.value
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ',');
    }

    this.propagateChange(Number(this.value));
  }

  writeValue(value: any): void {
    this.valueDisplay = value
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ',');
    this.value = value;
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
