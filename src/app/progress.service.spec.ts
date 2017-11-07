import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProgressService } from './progress.service';
import { AppModule } from './app.module';

describe('ProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([ProgressService], (service: ProgressService) => {
    expect(service).toBeTruthy();
  }));
});
