import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPlate, NewPlate } from '../plate.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlate for edit and NewPlateFormGroupInput for create.
 */
type PlateFormGroupInput = IPlate | PartialWithRequiredKeyOf<NewPlate>;

type PlateFormDefaults = Pick<NewPlate, 'id'>;

type PlateFormGroupContent = {
  id: FormControl<IPlate['id'] | NewPlate['id']>;
  name: FormControl<IPlate['name']>;
  photo: FormControl<IPlate['photo']>;
};

export type PlateFormGroup = FormGroup<PlateFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlateFormService {
  createPlateFormGroup(plate: PlateFormGroupInput = { id: null }): PlateFormGroup {
    const plateRawValue = {
      ...this.getFormDefaults(),
      ...plate,
    };
    return new FormGroup<PlateFormGroupContent>({
      id: new FormControl(
        { value: plateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(plateRawValue.name),
      photo: new FormControl(plateRawValue.photo),
    });
  }

  getPlate(form: PlateFormGroup): IPlate | NewPlate {
    return form.getRawValue() as IPlate | NewPlate;
  }

  resetForm(form: PlateFormGroup, plate: PlateFormGroupInput): void {
    const plateRawValue = { ...this.getFormDefaults(), ...plate };
    form.reset(
      {
        ...plateRawValue,
        id: { value: plateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PlateFormDefaults {
    return {
      id: null,
    };
  }
}
