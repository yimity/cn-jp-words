import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelComponent } from './excel.component';

describe('ExcelComponent', () => {
  let component: ExcelComponent;
  let fixture: ComponentFixture<ExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
