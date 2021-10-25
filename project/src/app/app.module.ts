import { GlobalDataEffect } from './store/global-data/global-data.effect';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponentModule } from './shared/components/shared-component.module';
import { SharedDirectiveModule } from './shared/directives/shared-directive.module';
import { SharedPipeModule } from './shared/pipes/shared-pipe.module';
import { ApiService } from './shared/services/api.service';
import { DataRoomEffect } from './store/data-room/data-room.effect';
import { globalDataReducer } from './store/global-data/global-data.reducer';
import { dataRoomReducer } from './store/data-room/data-room.reducer';
import { AppState } from './store/app/app.state';

const reducers: ActionReducerMap<AppState> = {
  dataRoom: dataRoomReducer,
  globalData: globalDataReducer
};

const effects = [
  DataRoomEffect,
  GlobalDataEffect
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(effects),
    SharedComponentModule,
    SharedDirectiveModule,
    SharedPipeModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
