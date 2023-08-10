import { IPlate, NewPlate } from './plate.model';

export const sampleWithRequiredData: IPlate = {
  id: '64df0645-00f7-485b-b54d-48b2e291384e',
};

export const sampleWithPartialData: IPlate = {
  id: '5ad2add7-82c9-4b5f-a8d4-75d98e6b0e59',
  photo: 'Netherlands index Cliff',
};

export const sampleWithFullData: IPlate = {
  id: 'bf197073-5af3-4f00-a814-13acceca5d45',
  name: 'technologies',
  photo: 'overriding Ergonomic',
};

export const sampleWithNewData: NewPlate = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
