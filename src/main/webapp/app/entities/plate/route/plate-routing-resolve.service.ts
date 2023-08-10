import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlate } from '../plate.model';
import { PlateService } from '../service/plate.service';

@Injectable({ providedIn: 'root' })
export class PlateRoutingResolveService implements Resolve<IPlate | null> {
  constructor(protected service: PlateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlate | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((plate: HttpResponse<IPlate>) => {
          if (plate.body) {
            return of(plate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
