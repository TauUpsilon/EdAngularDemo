import { DataRoom } from 'src/app/shared/models/data-room.model';
import { DataRequestAction } from '../actions/data-request.action';

export function dataRoomReducer(state: DataRoom, action: DataRequestAction): DataRoom {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        status: 'LOADING',
      };

    case 'SUCCESS':
      const room = new Map(state.collection);
      room.set(action.request.name, action.payload);

      return {
        ...state,
        status: 'SUCCESS',
        collection: room
      };

    case 'FAILURE':
      return {
        ...state,
        status: 'FAILURE'
      };

    default:
      return state;
  }
}
