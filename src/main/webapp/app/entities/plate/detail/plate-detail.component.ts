import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlate } from '../plate.model';

@Component({
  selector: 'jhi-plate-detail',
  templateUrl: './plate-detail.component.html',
})
export class PlateDetailComponent implements OnInit {
  plate: IPlate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plate }) => {
      this.plate = plate;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
