import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserState } from 'src/app/stores/states/user.state';
import { ApiState } from './../../stores/states/common.state';


@Injectable()
export class UserService {

  private currentURL: string;
  private currentPage = 'page=1';

  constructor(
    private readonly http: HttpClient,
  ) { }

  getUsers(): Observable<ApiState<UserState>>{
    this.currentURL = `https://gorest.co.in/public/v1/users?${this.currentPage}`;

    return this.http.get<ApiState<UserState>>(this.currentURL)
      .pipe(
        tap(res => this.currentPage = res.meta.pagination.links.next.split('?')[1])
      );
  }
}
