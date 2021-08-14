import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService]
})
export class UserComponent implements OnInit, AfterViewInit {

  users$: Observable<User>;
  userSubject = new Subject<void>();

  pageNum = 'page=1';

  constructor(private readonly userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userSubject.pipe(
      switchMap(() => this.userService.getUsers(this.pageNum)
        .pipe(
          tap((res) => this.pageNum = res.meta.pagination.links.next.split('?')[1])
        )
      ),
    );
  }

  ngAfterViewInit(): void {
    this.userSubject.next();
  }

  onPrevious(currentPage: number): void {
    if ((currentPage - 1) >= 1){
      this.pageNum = `page=${currentPage -= 1}`;
      this.userSubject.next();
    }
  }

  onNext(): void {
    this.userSubject.next();
  }
}
