import { Routes } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import {AllComponent} from "./component/all/all.component";

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'all', component: AllComponent }
];
