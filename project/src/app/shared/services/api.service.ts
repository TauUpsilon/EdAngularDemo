import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataRequestAction } from 'src/app/store/actions/data-request.action';
import * as DataRoomSelector from 'src/app/store/selectors/app.selector';
import { AppState } from 'src/app/store/states/app.state';
import { Collection } from '../models/data-room.model';
import { ApiData } from './../models/api-data.model';
import { BaseRequest } from './../requests/base.request';

@Injectable()
export class ApiService {

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  request<T>(request: BaseRequest, collection: Collection<T>): Observable<ApiData<T>> {
    const action = new DataRequestAction('LOADING', collection, request);
    this.store.dispatch(action);

    return this.store
      .pipe(
        select(DataRoomSelector.getDataRoom),
        switchMap(res => {
          console.log(res);
          const apiData = new ApiData<T>();
          apiData.collection = res.collections?.get(request.name);
          apiData.status = res.status;

          return of(apiData);
        })
      );
  }
}
