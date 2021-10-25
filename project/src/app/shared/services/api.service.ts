import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataRoomAction } from 'src/app/store/data-room/data-room.action';
import * as DataRoomSelector from 'src/app/store/app/app.selector';
import { AppState } from 'src/app/store/app/app.state';

import { Typeable } from '../types/typeable';
import { ApiData } from './../models/api-data.model';
import { BaseRequest } from './../requests/base.request';

@Injectable()
export class ApiService {

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  request<T>(request: BaseRequest, model: Typeable<T>): Observable<ApiData<T>> {
    const action = new DataRoomAction('LOADING', undefined, request, model);
    this.store.dispatch(action);

    return this.store
      .pipe(
        select(DataRoomSelector.getDataRoom),
        switchMap(res => {
          const apiData = new ApiData<T>();
          apiData.collection = res.collection?.get(request.name);
          apiData.status = res.status;

          return of(apiData);
        })
      );
  }
}
