import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {RouterLink} from "@angular/router";
import {SearchService, Word} from "../../service/search/search.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NzButtonModule,
    NzDividerModule,
    NzInputModule,
    NzTableModule,
    NzWaveModule,
    RouterLink
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent {
  loading = false;

  words: Word[] = [];

  constructor(private searchService: SearchService, private message: NzMessageService) {
    this.search();
  }

  search(): void {
    if(this.loading){
      return;
    }
    this.loading = true;
    this.searchService.searchWord('').subscribe(result => {
      this.words = result;
      this.loading = false;
    });
  }
}
