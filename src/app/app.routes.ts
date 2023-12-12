import { Routes } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import { AllComponent } from './component/all/all.component';
import { ExcelComponent } from './component/excel/excel.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'all', component: AllComponent },
  { path: 'excel', component: ExcelComponent },
];
