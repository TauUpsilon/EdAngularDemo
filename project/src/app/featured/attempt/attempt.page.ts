import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyConst } from 'src/app/shared/constants/currency';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.page.html',
  styleUrls: ['./attempt.page.scss']
})
export class AttemptPage implements OnInit {

  value: any;

  inputFormat = /\B(?=(\d{3})+(?!\d))/g;
  outputFormat = ',';

  ccy = CurrencyConst.getCCYByCode('TWD');

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onCatch(value: any): void {
    this.value = value;
  }
}
