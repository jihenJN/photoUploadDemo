import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PlateComponent } from './list/plate.component';
import { PlateDetailComponent } from './detail/plate-detail.component';
import { PlateUpdateComponent } from './update/plate-update.component';
import { PlateDeleteDialogComponent } from './delete/plate-delete-dialog.component';
import { PlateRoutingModule } from './route/plate-routing.module';

@NgModule({
  imports: [SharedModule, PlateRoutingModule],
  declarations: [PlateComponent, PlateDetailComponent, PlateUpdateComponent, PlateDeleteDialogComponent],
})
export class PlateModule {}
