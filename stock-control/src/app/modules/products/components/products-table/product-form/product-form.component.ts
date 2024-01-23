import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Router } from '@angular/router';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetCategoriesResponse';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { ProductsService } from 'src/app/services/products/products.service';
import { EventAction } from 'src/app/models/interfaces/event/eventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { EditProductRequest } from 'src/app/models/interfaces/products/request/EditProductRequest';
import { ProductsDataTransfereService } from 'src/app/shared/services/producuts/products-data-transfere.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: [],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public categoriesDatas: GetCategoriesResponse[] = [];
  public selectedCategory: Array<{ name: string; code: string }> = [];
  public productAction!: {
    event: EventAction;
    productsDatas: Array<GetAllProductsResponse>;
  };
  public productSelectedDatas!: GetAllProductsResponse;
  public productsDatas: GetAllProductsResponse[] = [];

  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    aumount: [0, Validators.required],
  });

  public editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: [0, Validators.required],
  });

  constructor(
    private categorieService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private productService: ProductsService,
    private ref: DynamicDialogConfig,
    private dialogService: DialogService,
    private productsDataTransfereService: ProductsDataTransfereService
  ) {}

  ngOnInit(): void {
    this.getAAlCategories();
    console.log(this.categoriesDatas);
    this.productAction = this.ref.data;
  }

  getAAlCategories() {
    this.categorieService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesDatas = response;
          }
        },
      });
  }

  handleSubmitAddProduct() {
    if (this.addProductForm?.value && this.addProductForm?.valid) {
      const requestCreateProduct: CreateProductRequest = {
        name: this.addProductForm.value.name as string,
        price: this.addProductForm.value.price as string,
        description: this.addProductForm.value.description as string,
        amount: Number(this.addProductForm.value.aumount),
        category_id: this.addProductForm.value.category_id as string,
      };
      this.productService
        .createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto incluído com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao incluir produto!',
              life: 2500,
            });
          },
        });
      //limpa o campos do formulário
    }
    this.addProductForm.reset();
  }

  handleSubmitEditProduct() {
    //if (this.editProductForm?.value && this.editProductForm?.valid) {
  }

  getProductSelectDatas(product_id: string): void {
    const allProducts = this.productAction?.productsDatas;

    if (allProducts.length > 0) {
      const productFiltered = allProducts.filter(
        (element) => element?.id === product_id
      );

      if (productFiltered) {
        this.productSelectedDatas = productFiltered[0];
        this.editProductForm.setValue({
          name: this.productSelectedDatas?.name,
          price: this.productSelectedDatas?.price,
          amount: this.productSelectedDatas?.amount,
          description: this.productSelectedDatas?.description,
        });
      }
    }
  }

  getProductDatas(): void {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsDatas = response;
            this.productsDatas &&
              //ataulizar o servico pasando productsDatas
              this.productsDataTransfereService.setProductDatas(
                this.productsDatas
              );
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
