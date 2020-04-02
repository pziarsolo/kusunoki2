import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedPetitionDetailComponent } from './seed-petition-detail.component';

describe('SeedPetitionDetailComponent', () => {
  let component: SeedPetitionDetailComponent;
  let fixture: ComponentFixture<SeedPetitionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedPetitionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedPetitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
