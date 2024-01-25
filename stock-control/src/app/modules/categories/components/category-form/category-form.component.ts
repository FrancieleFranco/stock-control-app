import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { CategoryEvent } from 'src/app/models/enums/categories/CategoryEvent';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: [],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public addCategoryEvent = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryEvent = CategoryEvent.EDIT_CATEGORY_ACTION;
  public categoryAction!: { event: EditCategoryAction };

  public categoryForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public ref: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  handleSubmitAddCategory(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
