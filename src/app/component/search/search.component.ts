import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgForOf } from '@angular/common';
import { SearchService, Word } from '../../service/search/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NgForOf,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  keyword = '';
  loading = false;

  words: Word[] = [];

  constructor(private searchService: SearchService) {}

  search(): void {
    this.loading = true;
    this.searchService.searchWord(this.keyword).subscribe(result => {
      this.words = result;
      this.loading = false;
    });
  }

  /*words: Word[] = [
    {
      japanese: '1',
      hiragana: 'John Brown',
      meanOfChinese: '32',
      chinese: 'New York No. 1 Lake Park',
      phonetic: 'New York No. 1 Lake Park',
      chineseMeaning: 'New York No. 1 Lake Park',
    },
    {
      japanese: '2',
      hiragana: 'Jim Green',
      meanOfChinese: '42',
      chinese: 'London No. 1 Lake Park',
      phonetic: 'London No. 1 Lake Park',
      chineseMeaning: 'London No. 1 Lake Park',
    },
    {
      japanese: '3',
      hiragana: 'Joe Black',
      meanOfChinese: '32',
      chinese: 'Sidney No. 1 Lake Park',
      phonetic: 'Sidney No. 1 Lake Park',
      chineseMeaning: 'Sidney No. 1 Lake Park',
    },
  ];*/
}
