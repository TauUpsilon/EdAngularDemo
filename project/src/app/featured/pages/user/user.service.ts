import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiData } from 'src/app/shared/models/api-data.model';
import { Collection } from 'src/app/shared/models/data-room.model';
import { UserGetRequest } from 'src/app/shared/requests/user.request';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from './../../../shared/models/user.model';


@Injectable()
export class UserService {

  constructor(
    private readonly apiService: ApiService
  ) { }

  getUsers(pageNum: string): Observable<ApiData<User>>{
    const userRequest = new UserGetRequest(pageNum);
    const userCollection = new Collection<User>();
    return this.apiService.request<User>(userRequest, userCollection);
  }
}
