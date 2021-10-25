import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as GlobalAction from './global-data.action';
import { filter, map, switchMap, tap, throttleTime } from 'rxjs/operators';

@Injectable()
export class GlobalDataEffect {
    /**
     * 更新未讀通知
     *
     * MBM044020 (取得通知列表)
     */
    // updateUnreadCount$ = createEffect(() => this.actions$.pipe(
    //     ofType(GlobalAction.UpdateUnReadCount),
    //     map(props => {
    //         if (props.unreadCount !== undefined) {
    //             this.store$.dispatch(GlobalAction.UpdateGlobalDataProperties({ source: { unReadCount: props.unreadCount } }));

    //             return true;
    //         }

    //         return false;
    //     }),
    //     filter(alreadyUpdate => !alreadyUpdate),
    //     throttleTime(500),
    //     switchMap(() => this.service.callMBM044020$()),
    //     filter(unreadData => unreadData.status.isShell !== 'loading'),
    //     tap(unreadData => {
    //         if (unreadData.status.isShell === 'error') {
    //             this.store$.dispatch(GlobalAction.UpdateGlobalDataProperties({ source: { unReadCount: 0 } }));
    //         } else if (unreadData.status.isShell === 'done') {
    //             this.store$.dispatch(GlobalAction.UpdateGlobalDataProperties({ source: { unReadCount: unreadData.value.UNREAD_CNT } }));
    //         }
    //     })
    // ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store,
    ) {
    }
}
