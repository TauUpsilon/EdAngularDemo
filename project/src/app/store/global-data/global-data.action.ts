import { createAction, props } from '@ngrx/store';

import * as GlobalDataReducer from './global-data.reducer';

// 透過reducer 清除 globalData
export const ClearGlobalData = createAction(
    '[GlobalData API] Clear Global Data',
    props<{}>()
);

// 透過reducer 清除 globalOtherData
export const ClearGlobalOtherData = createAction(
  '[GlobalData API] Clear Global Other Data',
  props<{}>()
);

// 透過reducer 進行 store狀態更新
export const UpdateGlobalDataProperties = createAction(
    '[GlobalData API] Update GlobalData Properties ',
    props<{
        source: GlobalDataReducer.UpdateGlobalDataPropertiesOpt;
    }>()
);

// 透過reducer 進行 store狀態更新
export const UpdateUnReadCount = createAction(
    '[GlobalData API] Update Unread Count',
    props<{
        unreadCount?: number
    }>()
);
