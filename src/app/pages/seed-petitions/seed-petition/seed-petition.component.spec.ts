import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedPetitionComponent } from './seed-petition.component';

describe('SeedPetitionComponent', () => {
  let component: SeedPetitionComponent;
  let fixture: ComponentFixture<SeedPetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedPetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
