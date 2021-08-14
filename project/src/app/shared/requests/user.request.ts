import { BaseRequest } from './base.request';

export class UserRequest extends BaseRequest {
  constructor() {
    super();

    this.name = 'users';
  }
}
