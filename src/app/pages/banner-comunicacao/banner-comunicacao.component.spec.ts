import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComunicacaoComponent } from './banner-comunicacao.component';

describe('BannerComunicacaoComponent', () => {
  let component: BannerComunicacaoComponent;
  let fixture: ComponentFixture<BannerComunicacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComunicacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComunicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
