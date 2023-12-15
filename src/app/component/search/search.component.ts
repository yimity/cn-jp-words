import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgForOf } from '@angular/common';
import { SearchService, Word, WordType } from '../../service/search/search.service';
import {NzMessageService} from "ng-zorro-antd/message";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { searchTypeList, typeColors } from '../../consts/search';
import { words } from '../../../../functions/api/words';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { copy } from '../../utils/utils';

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
    NzTagModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  protected readonly typeColors = typeColors;
  protected readonly searchTypeList = searchTypeList;

  keyword = '';
  loading = false;
  type = '0';

  words: Word[] = [];

  get tableClass(): string {
    return this.words.length !== 0 ? 'full-height-table' : '';
  }

  constructor(private searchService: SearchService, private message: NzMessageService) {}

  handleSearch(): void {
    if(this.loading){
      return;
    }
    this.loading = true;
    this.searchService.searchWord(this.keyword, Number(this.type) as WordType).subscribe(result => {
      this.words = result.data;
      this.loading = false;
    });
  }

  async handleCopy(word: Word) {
    const text = `${word.japanese}, ${word.hiragana}, ${word.meanOfChinese}, ${word.chinese}, ${word.chineseMeaning}`;
    try {
      const result = await copy(text);
      if (result) {
        this.message.success("复制成功");
      } else {
        this.message.error("复制失败");
      }
    } catch (e) {
      console.log(e);
      this.message.error("复制失败");
    }
  }
}
