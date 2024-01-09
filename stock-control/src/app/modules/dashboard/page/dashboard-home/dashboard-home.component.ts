import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProducts';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransfereService } from 'src/app/shared/services/producuts/products-data-transfere.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit {
  public productsList: Array<GetAllProductsResponse> = [];

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private productData: ProductsDataTransfereService
  ) {}

  ngOnInit(): void {
    this.getProductsData();
  }
  getProductsData(): void {
    this.productService.getAllProducts().subscribe({
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
}
