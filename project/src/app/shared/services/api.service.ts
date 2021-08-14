import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseBody } from '../models/api-response.model';
import { BaseRequest } from './../requests/base.request';


@Injectable()
export class ApiService {

  private readonly baseUri = 'https://gorest.co.in/public/v1';

  constructor(
    private readonly http: HttpClient,
  ) { }

  request<T>(request: BaseRequest): Observable<ResponseBody<T>> {
    const uri = `${this.baseUri}/${request.uri}`;

    return this.http.get<ResponseBody<T>>(uri).pipe(tap(console.log));
  }
}

// class ApiService {
//   final _baseUri = 'https://gorest.co.in/public/v1';
//   final _storeService = locator.get<StoreService>();

//   void request<T>(
//       BaseRequest request, BehaviorSubject<ApiResponse<T>> subject) {
//     var store = this._storeService.store;
//     var uri = Uri.parse('${this._baseUri}/${request.name}');

//     store.dispatch(ApiRequestAction(type: ActionType.LOADING));
//     var status = store.state.apiResponse.status;
//     var res = ApiResponse<T>(status: status);
//     subject.add(res);

//     http.get(uri).then((res) {
//       var mirror = imitable.reflectType(T) as ClassMirror;

//       final action = ApiRequestAction(
//           type: ActionType.SUCCESS,
//           payload: jsonDecode(res.body),
//           mirror: mirror);

//       store.dispatch(action);

//       var data = store.state.apiResponse.body.data
//           .map<T>((item) => mirror.invoke('fromJson', [item.toJson()]))
//           .toList();

//       var meta = store.state.apiResponse.body.meta;
//       var status = store.state.apiResponse.status;
//       var body = ResponseBody<T>(meta: meta, data: data);

//       subject.add(ApiResponse<T>(status: status, body: body));
//     });
//   }
// }
