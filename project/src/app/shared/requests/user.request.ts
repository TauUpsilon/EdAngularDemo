import { BaseRequest } from './base.request';

export class UserRequest extends BaseRequest {
  constructor(page: string) {
    super(`users?${page}`);
  }
}
