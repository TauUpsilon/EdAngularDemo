import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from './../../../shared/requests/user.request';
import { ApiService } from './../../../shared/services/api.service';


@Injectable()
export class UserService {

  constructor(
    private readonly apiService: ApiService
  ) { }

  getUsers(pageNum: string): Observable<any>{
    const userRequest = new UserRequest(pageNum);

    return this.apiService.request<any>(userRequest);
  }
}
