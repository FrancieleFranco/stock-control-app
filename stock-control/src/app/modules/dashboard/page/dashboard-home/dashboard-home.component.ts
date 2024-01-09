import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProducts';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransfereService } from 'src/app/shared/services/producuts/products-data-transfere.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  public productsList: Array<GetAllProductsResponse> = [];
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private productData: ProductsDataTransfereService
  ) {}

  ngOnInit(): void {
    this.getProductsData();
  }
  getProductsData(): void {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsList = response;
            this.productData.setProductDatas(this.productsList);
            console.log('dados', this.productsList);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos',
            life: 2500,
          });
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
