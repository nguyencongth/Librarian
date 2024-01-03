import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrowComponent } from './dialog-borrow.component';

describe('DialogBorrowComponent', () => {
  let component: DialogBorrowComponent;
  let fixture: ComponentFixture<DialogBorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBorrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
