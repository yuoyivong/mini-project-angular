import { createAction, props } from '@ngrx/store';
import { Category } from '../category.model';

export const getAllCategories = createAction(
  '[Category Component] Get All Category',
  props<{ categories: Array<Category> }>()
);
