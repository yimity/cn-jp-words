import { Component } from '@angular/core';
import { read, utils, writeFile, writeFileXLSX } from 'xlsx';
import { RowKey, Word, WordType } from '../../service/search/search.service';
import { NgForOf } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { words } from '../../../../functions/api/words';

const WordTypeMap = {
  词义扩大: 1 as WordType,
  词义缩小: 2 as WordType,
  词义转移: 3 as WordType,
};

type WordTypeKey = keyof typeof WordTypeMap;

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [NgForOf, NzDividerModule, NzTableModule, NzUploadModule, NzButtonModule, NzIconModule],
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.scss',
})
export class ExcelComponent {
  words: Word[] = words;

  get tableClass(): string {
    return this.words.length !== 0 ? 'full-height-table' : '';
  }

  constructor(private msg: NzMessageService) {}

  handleBeforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      let words: Word[] = [];
      const result = e?.target?.result;

      if (result) {
        const wb = read(e.target.result);

        wb.SheetNames.map(sheetName => {
          const ws = wb.Sheets[sheetName];
          const type = WordTypeMap[sheetName as WordTypeKey];
          const json = utils.sheet_to_json<RowKey>(ws);
          const wordList = json.map(word => {
            return {
              type,
              japanese: word['日语单词'],
              hiragana: word['日语读音'],
              meanOfChinese: word['日语词意'],
              chinese: word['中文单词'],
              phonetic: word['中文读音'],
              chineseMeaning: word['中文词意'],
            };
          });

          words = words.concat(wordList);
        });
      }

      this.words = words;
    };
    reader.readAsArrayBuffer(file as any);
    return false;
  };

  handleFileChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }
}
