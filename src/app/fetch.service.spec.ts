import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FetchService } from './fetch.service';
import { AppModule } from './app.module';

describe('FetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([FetchService], (service: FetchService) => {
    expect(service).toBeTruthy();
  }));
});
