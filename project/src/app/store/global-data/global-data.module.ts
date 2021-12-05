import { InjectionToken, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MODULE_ID } from './global-data.constant';
import { GlobalDataEffect } from './global-data.effect';
import { globalDataReducer } from './global-data.reducer';

export const GlobalDataReducer = new InjectionToken<any>('globalDataReducer');

@NgModule({
    imports: [
        StoreModule.forFeature(MODULE_ID, GlobalDataReducer),
        EffectsModule.forFeature([GlobalDataEffect])
    ],
    providers: [
        { provide: GlobalDataReducer, useValue: globalDataReducer }
    ]
})
export class GlobalDataModule { }
