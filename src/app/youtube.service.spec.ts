import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { YoutubeService } from './youtube.service';
import { AppModule } from './app.module';

describe('YoutubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ],
      providers: [ YoutubeService ]
    });
  });

  it('should be created', inject([YoutubeService], (service: YoutubeService) => {
    expect(service).toBeTruthy();
  }));
});
