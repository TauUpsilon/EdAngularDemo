import { Meta } from './meta.model';

export class DataRoom {
  status: 'LOADING' | 'SUCCESS' | 'FAILURE';
  collections: Map<string, Collection<any>>;
}

export class Collection<T> {
  meta: Meta;
  data: Array<T>;
}
