import { TestBed } from '@angular/core/testing';

import { AddEditUserService } from './add-user.service';

describe('AddEditUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEditUserService = TestBed.get(AddEditUserService);
    expect(service).toBeTruthy();
  });
});
