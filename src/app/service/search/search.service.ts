import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type WordType = 0 | 1 | 2 | 3;

export interface RowKey {
  日语单词: string;
  日语读音: string;
  日语词意: string;
  中文单词: string;
  中文读音: string;
  中文词意: string;
}

export interface Word {
  japanese: string;
  hiragana: string;
  meanOfChinese: string;
  chinese: string;
  phonetic: string;
  chineseMeaning: string;
  type: WordType;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchWord(keyword: string, type: WordType = 0) {
    return this.http.get<{ data: Word[] }>(`/api/search?keyword=${keyword}&type=${type}`);
  }
}
