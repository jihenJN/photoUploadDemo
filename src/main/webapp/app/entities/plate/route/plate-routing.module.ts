import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PlateComponent } from '../list/plate.component';
import { PlateDetailComponent } from '../detail/plate-detail.component';
import { PlateUpdateComponent } from '../update/plate-update.component';
import { PlateRoutingResolveService } from './plate-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const plateRoute: Routes = [
  {
    path: '',
    component: PlateComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlateDetailComponent,
    resolve: {
      plate: PlateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlateUpdateComponent,
    resolve: {
      plate: PlateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlateUpdateComponent,
    resolve: {
      plate: PlateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(plateRoute)],
  exports: [RouterModule],
})
export class PlateRoutingModule {}
