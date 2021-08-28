import { Action } from '@ngrx/store';
import { Collection } from 'src/app/shared/models/data-room.model';
import { BaseRequest } from '../../shared/requests/base.request';

export class DataRequestAction implements Action {
  type: 'LOADING' | 'SUCCESS' | 'FAILURE';
  payload: Collection<any>;
  request: BaseRequest;

  constructor(type: 'LOADING' | 'SUCCESS' | 'FAILURE', payload?: Collection<any>, request?: BaseRequest) {
    this.type = type;
    this.payload = payload;
    this.request = request;
  }
}

