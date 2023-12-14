import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgForOf } from '@angular/common';
import { SearchService, Word } from '../../service/search/search.service';
import {NzMessageService} from "ng-zorro-antd/message";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { searchTypeList } from '../../consts/search';
import { words } from '../../../../functions/api/words';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NgForOf,
    FormsModule,
    RouterLink,
    NzSelectModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  keyword = '';
  loading = false;

  selectedValue = '0';
  searchTypeList = searchTypeList;

  words: Word[] = words;

  get tableClass(): string {
    return this.words.length !== 0 ? 'full-height-table' : '';
  }

  constructor(private searchService: SearchService, private message: NzMessageService) {}

  search(): void {
    if(!this.keyword){
      this.message.create('error', `Keyword can't be empty!`);
      // keyword.focus();
      return;
    }
    if(this.loading){
      return;
    }
    this.loading = true;
    this.searchService.searchWord(this.keyword).subscribe(result => {
      this.words = result;
      this.loading = false;
    });
  }
}
