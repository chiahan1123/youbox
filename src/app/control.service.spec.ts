import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ControlService } from './control.service';
import { AppModule } from './app.module';

describe('ControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([ControlService], (service: ControlService) => {
    expect(service).toBeTruthy();
  }));
});
