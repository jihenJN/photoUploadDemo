import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPlate } from '../plate.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../plate.test-samples';

import { PlateService } from './plate.service';

const requireRestSample: IPlate = {
  ...sampleWithRequiredData,
};

describe('Plate Service', () => {
  let service: PlateService;
  let httpMock: HttpTestingController;
  let expectedResult: IPlate | IPlate[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PlateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Plate', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const plate = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(plate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Plate', () => {
      const plate = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(plate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Plate', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Plate', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Plate', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPlateToCollectionIfMissing', () => {
      it('should add a Plate to an empty array', () => {
        const plate: IPlate = sampleWithRequiredData;
        expectedResult = service.addPlateToCollectionIfMissing([], plate);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(plate);
      });

      it('should not add a Plate to an array that contains it', () => {
        const plate: IPlate = sampleWithRequiredData;
        const plateCollection: IPlate[] = [
          {
            ...plate,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPlateToCollectionIfMissing(plateCollection, plate);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Plate to an array that doesn't contain it", () => {
        const plate: IPlate = sampleWithRequiredData;
        const plateCollection: IPlate[] = [sampleWithPartialData];
        expectedResult = service.addPlateToCollectionIfMissing(plateCollection, plate);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(plate);
      });

      it('should add only unique Plate to an array', () => {
        const plateArray: IPlate[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const plateCollection: IPlate[] = [sampleWithRequiredData];
        expectedResult = service.addPlateToCollectionIfMissing(plateCollection, ...plateArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const plate: IPlate = sampleWithRequiredData;
        const plate2: IPlate = sampleWithPartialData;
        expectedResult = service.addPlateToCollectionIfMissing([], plate, plate2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(plate);
        expect(expectedResult).toContain(plate2);
      });

      it('should accept null and undefined values', () => {
        const plate: IPlate = sampleWithRequiredData;
        expectedResult = service.addPlateToCollectionIfMissing([], null, plate, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(plate);
      });

      it('should return initial array if no Plate is added', () => {
        const plateCollection: IPlate[] = [sampleWithRequiredData];
        expectedResult = service.addPlateToCollectionIfMissing(plateCollection, undefined, null);
        expect(expectedResult).toEqual(plateCollection);
      });
    });

    describe('comparePlate', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePlate(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.comparePlate(entity1, entity2);
        const compareResult2 = service.comparePlate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.comparePlate(entity1, entity2);
        const compareResult2 = service.comparePlate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.comparePlate(entity1, entity2);
        const compareResult2 = service.comparePlate(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
