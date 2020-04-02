import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedPetitionListComponent } from './seed-petition-list.component';

describe('SeedPetitionListComponent', () => {
  let component: SeedPetitionListComponent;
  let fixture: ComponentFixture<SeedPetitionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedPetitionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedPetitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
