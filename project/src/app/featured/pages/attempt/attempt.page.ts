import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.page.html',
  styleUrls: ['./attempt.page.scss']
})
export class AttemptPage implements OnInit {

  value: any;

  inputFormat = /\B(?=(\d{3})+(?!\d))/g;
  outputFormat = ',';

  constructor() { }

  ngOnInit(): void {
  }

  onCatch(value: any): void {
    this.value = value;
  }
}
