import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponentModule } from './shared/components/shared-component.module';
import { SharedDirectiveModule } from './shared/directives/shared-directive.module';
import { ApiService } from './shared/services/api.service';
import { DateRequestEffect } from './store/effects/api-request.effect';
import { dataRoomReducer } from './store/reducers/data-room.reducer';
import { AppState } from './store/states/app.state';

const reducers: ActionReducerMap<AppState> = {
  dataRoom: dataRoomReducer
};

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
    EffectsModule.forRoot([DateRequestEffect]),
    SharedComponentModule,
    SharedDirectiveModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
