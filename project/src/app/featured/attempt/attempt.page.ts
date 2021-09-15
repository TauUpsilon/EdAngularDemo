import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.page.html',
  styleUrls: ['./attempt.page.scss']
})
export class AttemptPage implements OnInit {

  value: any;

  inputFormat = /\B(?=(\d{3})+(?!\d))/g;
  outputFormat = ',';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onCatch(value: any): void {
    this.value = value;
  }
}
