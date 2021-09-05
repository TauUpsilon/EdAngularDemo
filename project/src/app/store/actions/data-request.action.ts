import { Action } from '@ngrx/store';
import { Collection } from 'src/app/shared/models/data-room.model';
import { Typeable } from 'src/app/shared/types/typeable';
import { BaseRequest } from '../../shared/requests/base.request';

export class DataRequestAction implements Action {
  type: 'LOADING' | 'SUCCESS' | 'FAILURE';
  payload: Collection<any>;
  request: BaseRequest;
  model: Typeable<any>;

  constructor(
    type: 'LOADING' | 'SUCCESS' | 'FAILURE',
    payload?: Collection<any>,
    request?: BaseRequest,
    model?: Typeable<any>
  ) {
    this.type = type;
    this.payload = payload;
    this.request = request;
    this.model = model;
  }
}
