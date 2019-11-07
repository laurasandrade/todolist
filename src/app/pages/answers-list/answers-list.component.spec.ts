import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersListComponent } from './answers-list.page';

describe('AnswersListComponent', () => {
  let component: AnswersListComponent;
  let fixture: ComponentFixture<AnswersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
