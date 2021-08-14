import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { ResponseBody } from './../../../shared/models/api-response.model';
import { UserRequest } from './../../../shared/requests/user.request';
import { ApiService } from './../../../shared/services/api.service';


@Injectable()
export class UserService {

  constructor(
    private readonly apiService: ApiService
  ) { }

  getUsers(pageNum: string): Observable<ResponseBody<User>>{
    const userRequest = new UserRequest(pageNum);

    return this.apiService.request<User>(userRequest);
  }
}
