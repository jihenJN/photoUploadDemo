import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../plate.test-samples';

import { PlateFormService } from './plate-form.service';

describe('Plate Form Service', () => {
  let service: PlateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlateFormService);
  });

  describe('Service methods', () => {
    describe('createPlateFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPlateFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            photo: expect.any(Object),
          })
        );
      });

      it('passing IPlate should create a new form with FormGroup', () => {
        const formGroup = service.createPlateFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            photo: expect.any(Object),
          })
        );
      });
    });

    describe('getPlate', () => {
      it('should return NewPlate for default Plate initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPlateFormGroup(sampleWithNewData);

        const plate = service.getPlate(formGroup) as any;

        expect(plate).toMatchObject(sampleWithNewData);
      });

      it('should return NewPlate for empty Plate initial value', () => {
        const formGroup = service.createPlateFormGroup();

        const plate = service.getPlate(formGroup) as any;

        expect(plate).toMatchObject({});
      });

      it('should return IPlate', () => {
        const formGroup = service.createPlateFormGroup(sampleWithRequiredData);

        const plate = service.getPlate(formGroup) as any;

        expect(plate).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPlate should not enable id FormControl', () => {
        const formGroup = service.createPlateFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPlate should disable id FormControl', () => {
        const formGroup = service.createPlateFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
