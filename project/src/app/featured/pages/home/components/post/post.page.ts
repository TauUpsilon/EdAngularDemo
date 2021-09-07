import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/models/post.model';
import { unsortedOrder } from 'src/app/shared/overloads/keyvalue.overload';
import { ApiData } from '../../../../../shared/models/api-data.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  providers: [PostService],
})
export class PostPage implements OnInit, AfterViewInit {
  posts$: Observable<ApiData<Post>>;
  postSubject = new Subject<void>();

  pageNum = 'page=1';

  get unsortedOrder(): any {
    return unsortedOrder;
  }

  constructor(private readonly postService: PostService) {}

  ngOnInit() {
    this.posts$ = this.postSubject.pipe(
      switchMap(() => this.postService.getPosts(this.pageNum)
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
      this.postSubject.next();
    }, 10);
  }

  onPrevious(currentPage: number): void {
    if (currentPage - 1 >= 1) {
      this.pageNum = `page=${(currentPage -= 1)}`;
      this.postSubject.next();
    }
  }

  onNext(): void {
    this.postSubject.next();
  }
}
