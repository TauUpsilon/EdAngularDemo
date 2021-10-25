import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MODULE_ID } from './global-data.constant';
import { GlobalDataState } from './global-data.reducer';

export const getSlice = createFeatureSelector<GlobalDataState>(MODULE_ID);

export const getGlobalData = createSelector(getSlice, s => s);
