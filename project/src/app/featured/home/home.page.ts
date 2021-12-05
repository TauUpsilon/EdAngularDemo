import { switchMap, filter, take } from 'rxjs/operators';
import { combineLatest, of, Subscription } from 'rxjs';
import { getGlobalData } from './../../store/global-data/global-data.selector';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { UpdateGlobalDataProperties } from 'src/app/store/global-data';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  subscription = new Subscription();

  form  = new FormGroup({
    ccy: new FormControl({value: '1000', disabled: false})
  });

  decimalPlace = 2;
  value = 1000;

  constructor(
    private readonly store: Store
  ) {}

  ngOnInit(): void  {

  }

  submit(): void {
    console.log(this.form.value);
    console.log(this.form.valid);
  }

  empty(): void {
    this.form.get('ccy').setValue('');
  }

  zero(): void {
    this.decimalPlace = 0;
    this.form.get('ccy').setValue('');
  }

  two(): void {
    this.decimalPlace = 2;
    this.form.get('ccy').setValue('');
  }

  increase(): void {
    this.value ++;
  }

  decrease(): void {
    this.value --;
  }
}
