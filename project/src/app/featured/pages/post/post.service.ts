import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiData } from 'src/app/shared/models/api-data.model';
import { Post } from 'src/app/shared/models/post.model';
import { PostGetRequest } from 'src/app/shared/requests/post.request';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable()
export class PostService {

  constructor(
    private readonly apiService: ApiService
  ) { }

  getPosts(pageNum: string): Observable<ApiData<Post>>{
    const postRequest = new PostGetRequest(pageNum);
    return this.apiService.request<Post>(postRequest, Post);
  }
}
