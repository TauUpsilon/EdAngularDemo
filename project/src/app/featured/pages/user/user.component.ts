import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { unsortedOrder } from 'src/app/shared/overloads/keyvalue.overload';
import { ApiData } from './../../../shared/models/api-data.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService],
})
export class UserComponent implements OnInit, AfterViewInit {
  users$: Observable<ApiData<User>>;
  userSubject = new Subject<void>();

  pageNum = 'page=1';

  get unsortedOrder(): any {
    return unsortedOrder;
  }

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userSubject.pipe(
      switchMap(() => this.userService.getUsers(this.pageNum)
        .pipe(
          switchMap((res) => {
            if (res.status === 'SUCCESS'){
              this.pageNum = res.collection.meta.pagination.links.next.split('?')[1];
            }

            return of(res);
          })
        )
      ),
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.userSubject.next();
    }, 10);
  }

  onPrevious(currentPage: number): void {
    if (currentPage - 1 >= 1) {
      this.pageNum = `page=${(currentPage -= 1)}`;
      this.userSubject.next();
    }
  }

  onNext(): void {
    this.userSubject.next();
  }
}
