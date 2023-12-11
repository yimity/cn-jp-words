import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Word {
  japanese: string;
  hiragana: string;
  meanOfChinese: string;
  chinese: string;
  phonetic: string;
  chineseMeaning: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchWord(keyword: string) {
    return this.http.get<Word[]>('https://cn-jp-words.pages.dev/api/search?keyword=' + keyword);
    // return this.http.get<Word[]>('/api/search?keyword=' + keyword);
  }
}
