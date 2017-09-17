import { TestBed, inject } from '@angular/core/testing';

import { DailyEntryService } from './daily-entry.service';

describe('DailyEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyEntryService]
    });
  });

  it('should be created', inject([DailyEntryService], (service: DailyEntryService) => {
    expect(service).toBeTruthy();
  }));
});
