import { TestBed } from '@angular/core/testing';

import { NotitielijstService } from './notitielijst.service';

describe('NotitielijstService', () => {
  let service: NotitielijstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotitielijstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
