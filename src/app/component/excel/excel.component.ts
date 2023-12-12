import { Component } from '@angular/core';
import { read, utils, writeFile, writeFileXLSX } from 'xlsx';
import { Word } from '../../service/search/search.service';
import { NgForOf } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [
    NgForOf,
    NzDividerModule,
    NzTableModule,
    NzUploadModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.scss',
})
export class ExcelComponent {
  words: Word[] = [];

  constructor(private msg: NzMessageService) {}

  handleBeforeUpload = (file: NzUploadFile): boolean => {
    console.log('handleBeforeUpload: ', file);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file as any);
    reader.onload = (e: any) => {
      console.log('handleBeforeUpload E: ', e);
      const wb = read(e);

      /* generate array of objects from first worksheet */
      const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
      const words = utils.sheet_to_json<Word>(ws); // generate objects

      /* update data */
      console.log(words);
    };
    return  false;
  }

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

  async load(): Promise<void> {
    /* Download from https://sheetjs.com/pres.numbers */
    const f = await fetch('https://sheetjs.com/pres.numbers');
    const ab = await f.arrayBuffer();

    /* parse workbook */
    const wb = read(ab);

    /* generate array of objects from first worksheet */
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const words = utils.sheet_to_json<Word>(ws); // generate objects

    /* update data */
    console.log(words);
    this.words = words;
  }

  ngOnInit(): void {
    this.load();
  }
}
