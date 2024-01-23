import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataTransfereService {
  public productsDataEmitter$ = new BehaviorSubject<
    GetAllProductsResponse[] | null
  >(null);
  public productData: Array<GetAllProductsResponse> = [];

  setProductDatas(products: Array<GetAllProductsResponse>): void {
    this.productsDataEmitter$.next(products);
    this.getProductsDatas();
  }
  getProductsDatas() {
    this.productsDataEmitter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productData = response;
          }
        },
      });
    return this.productData;
  }
}
