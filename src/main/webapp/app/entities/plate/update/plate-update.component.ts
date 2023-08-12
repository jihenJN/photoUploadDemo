import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PlateFormService, PlateFormGroup } from './plate-form.service';
import { IPlate } from '../plate.model';
import { PlateService } from '../service/plate.service';

@Component({
  selector: 'jhi-plate-update',
  templateUrl: './plate-update.component.html',
})
export class PlateUpdateComponent implements OnInit {
  isSaving = false;
  plate: IPlate | null = null;

  editForm: PlateFormGroup = this.plateFormService.createPlateFormGroup();

  constructor(
    protected plateService: PlateService,
    protected plateFormService: PlateFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plate }) => {
      this.plate = plate;
      if (plate) {
        this.updateForm(plate);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const plate = this.plateFormService.getPlate(this.editForm);
    if (plate.id !== null) {
      this.subscribeToSaveResponse(this.plateService.update(plate));
    } else {
      this.subscribeToSaveResponse(this.plateService.create(plate));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlate>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(plate: IPlate): void {
    this.plate = plate;
    this.plateFormService.resetForm(this.editForm, plate);
  }

  protected onImageUploaded(url: string): void {
    // Set the image URL in the 'photo' form control
    this.editForm.get('photo')?.setValue('hello its me');
  }
}
