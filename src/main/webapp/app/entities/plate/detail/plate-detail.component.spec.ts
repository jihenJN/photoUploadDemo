import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlateDetailComponent } from './plate-detail.component';

describe('Plate Management Detail Component', () => {
  let comp: PlateDetailComponent;
  let fixture: ComponentFixture<PlateDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlateDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ plate: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(PlateDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PlateDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load plate on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.plate).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
