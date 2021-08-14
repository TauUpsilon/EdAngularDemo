import { Meta } from './meta.model';

export enum ResponseStatus { SUCCESS, FAILURE, LOADING }

export class ApiResponse<T> {
  status: ResponseStatus;
  body: ResponseBody<T>;
}

export class ResponseBody<T> {
  meta: Meta;
  data: Array<T>;
}
