import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class UserService {

  private currentURL: string;
  private currentPage = 'page=1';

  constructor(
    private readonly http: HttpClient,
  ) { }

  getUsers(): Observable<any>{
    this.currentURL = `https://gorest.co.in/public/v1/users?${this.currentPage}`;

    return this.http.get<any>(this.currentURL)
      .pipe(
        tap(res => this.currentPage = res.meta.pagination.links.next.split('?')[1])
      );
  }
}
