import { createReducer, on } from '@ngrx/store';
import { Category } from '../models/category.model';
import * as CategoryAction from '../models/action/category.action';

export const initialState: Array<Category> = [];

export const categoryReducer = createReducer(
  initialState,
  on(CategoryAction.getAllCategories, (state, { categories }) => categories)
);
