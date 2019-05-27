import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonStatsByEntityComponent } from './taxon-stats-by-entity.component';

describe('TaxonStatsByEntityComponent', () => {
  let component: TaxonStatsByEntityComponent;
  let fixture: ComponentFixture<TaxonStatsByEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonStatsByEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonStatsByEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
