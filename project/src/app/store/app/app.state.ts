import { DataRoom } from 'src/app/shared/models/data-room.model';
import { GlobalDataState } from '../global-data';

export class AppState {
  dataRoom: DataRoom;
  globalData: GlobalDataState;
}
