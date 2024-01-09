import { TestBed } from '@angular/core/testing';

import { ProductsDataTransfereService } from './products-data-transfere.service';

describe('ProcutsDataTransfereService', () => {
  let service: ProductsDataTransfereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDataTransfereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
