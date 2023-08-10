export interface IPlate {
  id: string;
  name?: string | null;
  photo?: string | null;
}

export type NewPlate = Omit<IPlate, 'id'> & { id: null };
