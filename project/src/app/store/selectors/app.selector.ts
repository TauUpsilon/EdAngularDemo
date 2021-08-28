import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataRoom } from 'src/app/shared/models/data-room.model';

export const getDataRoom =  createSelector(
  createFeatureSelector<DataRoom>('dataRoom'),
  (state: DataRoom) => state
);
