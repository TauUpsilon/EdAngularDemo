import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Collection } from 'src/app/shared/models/data-room.model';
import { DataRequestAction } from '../actions/data-request.action';


@Injectable()
export class DateRequestEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {
  }

  load$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<DataRequestAction>('LOADING'),
      mergeMap((action, index) => {
        const baseUri = 'https://gorest.co.in/public/v1';
        const request = action.request;
        const uri = `${baseUri}/${request.uri}`;

        switch (request.method) {

          case 'get':
            return this.http.get<Collection<any>>(uri)
              .pipe(
                map((res) =>
                  new DataRequestAction('SUCCESS', res, action.request)
                ),
                catchError((err) => of(new DataRequestAction('FAILURE')))
              );

          case 'post':
            const body = {

            };

            return this.http.post<Collection<any>>(uri, body)
            .pipe(
              map((res) =>
                new DataRequestAction('SUCCESS', res, action.request)
              ),
              catchError((err) => of(new DataRequestAction('FAILURE')))
            );
          default:
            break;
        }

      })
    );
  });
}

