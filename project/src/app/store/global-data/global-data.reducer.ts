import { createReducer, on } from '@ngrx/store';

import * as GlobalDataAction from './global-data.action';

/*
Global Data: (app scope variable)
*/
export class GlobalDataState {
    isE2ee: boolean | undefined;
    isUsbDebug: boolean | undefined;
    unReadCount?: number;
    other?: Map<string, any>;

    constructor(
        isE2ee: boolean,
        isUsbDebug: boolean,
        unReadCount?: number,
        other?: Map<string, any>
    ) {
        this.isE2ee = isE2ee;
        this.isUsbDebug = isUsbDebug;
        this.unReadCount = unReadCount;
        this.other = other;
    }
}
const initialGlobalDataStateState = new GlobalDataState(true, false, 100, new Map());

export const globalDataReducer = createReducer(
    initialGlobalDataStateState,
    // 更新 GlobalDataState 內的 properties
    on(GlobalDataAction.UpdateGlobalDataProperties, (state, { source }) => {
        return {
            ...bindObj(state, {...source, other: updateOther(state.other, source.other)})
        };
    }),
    on(GlobalDataAction.ClearGlobalData, (state, { }) => {
        return {
            ...initialGlobalDataStateState
        };
    }),
    on(GlobalDataAction.ClearGlobalOtherData, (state, { }) => {
        return {
          ...state,
          other: undefined
        };
    })
);
export interface UpdateGlobalDataPropertiesOpt {
    // 用來update globalData 的物件，不寫值代表不更新該值
    isE2ee?: boolean;
    isUsbDebug?: boolean;
    unReadCount?: number;
    other?: Map<string, any>;
}

function updateOther(otherOrigin: Map<string, any>, otherIn: Map<string, any> ): Map<string, any> {
    const newOther = new Map(otherOrigin);

    if (otherIn) {
        for (const key of otherIn.keys()) {
            newOther.set(key, otherIn.get(key));
        }
    }

    return newOther;
}

function bindObj<T>(data: T, source: UpdateGlobalDataPropertiesOpt): T {
    // new 一個 obj 去填入目前 state[data] 的值, 如果 source 有對應的 property 則拿 source 的
    const newData = {};
    Object.keys(data)
        .forEach(k => {
            newData[k] = (source[k] !== undefined) ? source[k] : data[k];
        });

    return (newData as T);
}
