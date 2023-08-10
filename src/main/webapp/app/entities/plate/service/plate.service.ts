import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlate, NewPlate } from '../plate.model';

export type PartialUpdatePlate = Partial<IPlate> & Pick<IPlate, 'id'>;

export type EntityResponseType = HttpResponse<IPlate>;
export type EntityArrayResponseType = HttpResponse<IPlate[]>;

@Injectable({ providedIn: 'root' })
export class PlateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/plates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(plate: NewPlate): Observable<EntityResponseType> {
    return this.http.post<IPlate>(this.resourceUrl, plate, { observe: 'response' });
  }

  update(plate: IPlate): Observable<EntityResponseType> {
    return this.http.put<IPlate>(`${this.resourceUrl}/${this.getPlateIdentifier(plate)}`, plate, { observe: 'response' });
  }

  partialUpdate(plate: PartialUpdatePlate): Observable<EntityResponseType> {
    return this.http.patch<IPlate>(`${this.resourceUrl}/${this.getPlateIdentifier(plate)}`, plate, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IPlate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlate[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPlateIdentifier(plate: Pick<IPlate, 'id'>): string {
    return plate.id;
  }

  comparePlate(o1: Pick<IPlate, 'id'> | null, o2: Pick<IPlate, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlateIdentifier(o1) === this.getPlateIdentifier(o2) : o1 === o2;
  }

  addPlateToCollectionIfMissing<Type extends Pick<IPlate, 'id'>>(
    plateCollection: Type[],
    ...platesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const plates: Type[] = platesToCheck.filter(isPresent);
    if (plates.length > 0) {
      const plateCollectionIdentifiers = plateCollection.map(plateItem => this.getPlateIdentifier(plateItem)!);
      const platesToAdd = plates.filter(plateItem => {
        const plateIdentifier = this.getPlateIdentifier(plateItem);
        if (plateCollectionIdentifiers.includes(plateIdentifier)) {
          return false;
        }
        plateCollectionIdentifiers.push(plateIdentifier);
        return true;
      });
      return [...platesToAdd, ...plateCollection];
    }
    return plateCollection;
  }
}
