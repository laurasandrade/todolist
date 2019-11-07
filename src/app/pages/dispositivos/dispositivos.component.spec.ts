import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivosPage } from './dispositivos.page';

describe('DispositivosPage', () => {
  let component: DispositivosPage;
  let fixture: ComponentFixture<DispositivosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivosPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
