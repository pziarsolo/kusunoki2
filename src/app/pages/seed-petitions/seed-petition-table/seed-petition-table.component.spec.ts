import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedPetitionTableComponent } from './seed-petition-table.component';

describe('SeedPetitionTableComponent', () => {
  let component: SeedPetitionTableComponent;
  let fixture: ComponentFixture<SeedPetitionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedPetitionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedPetitionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
