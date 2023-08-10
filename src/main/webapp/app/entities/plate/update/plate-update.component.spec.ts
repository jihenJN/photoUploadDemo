import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PlateFormService } from './plate-form.service';
import { PlateService } from '../service/plate.service';
import { IPlate } from '../plate.model';

import { PlateUpdateComponent } from './plate-update.component';

describe('Plate Management Update Component', () => {
  let comp: PlateUpdateComponent;
  let fixture: ComponentFixture<PlateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let plateFormService: PlateFormService;
  let plateService: PlateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PlateUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PlateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    plateFormService = TestBed.inject(PlateFormService);
    plateService = TestBed.inject(PlateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const plate: IPlate = { id: 'CBA' };

      activatedRoute.data = of({ plate });
      comp.ngOnInit();

      expect(comp.plate).toEqual(plate);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlate>>();
      const plate = { id: 'ABC' };
      jest.spyOn(plateFormService, 'getPlate').mockReturnValue(plate);
      jest.spyOn(plateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: plate }));
      saveSubject.complete();

      // THEN
      expect(plateFormService.getPlate).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(plateService.update).toHaveBeenCalledWith(expect.objectContaining(plate));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlate>>();
      const plate = { id: 'ABC' };
      jest.spyOn(plateFormService, 'getPlate').mockReturnValue({ id: null });
      jest.spyOn(plateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plate: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: plate }));
      saveSubject.complete();

      // THEN
      expect(plateFormService.getPlate).toHaveBeenCalled();
      expect(plateService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlate>>();
      const plate = { id: 'ABC' };
      jest.spyOn(plateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(plateService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
