import { getGlobalData } from './../../store/global-data/global-data.selector';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { UpdateGlobalDataProperties } from 'src/app/store/global-data';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(

  ) {}

  ngOnInit(): void  {

  }
}
