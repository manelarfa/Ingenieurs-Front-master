import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncedetailComponent } from './annoncedetail.component';

describe('AnnoncedetailComponent', () => {
  let component: AnnoncedetailComponent;
  let fixture: ComponentFixture<AnnoncedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
