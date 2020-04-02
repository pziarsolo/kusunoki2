import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedPetitionCreateComponent } from './seed-petition-create.component';

describe('SeedPetitionCreateComponent', () => {
  let component: SeedPetitionCreateComponent;
  let fixture: ComponentFixture<SeedPetitionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedPetitionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedPetitionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
