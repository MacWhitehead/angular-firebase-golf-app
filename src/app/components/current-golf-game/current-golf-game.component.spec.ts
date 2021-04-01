import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentGolfGameComponent } from './current-golf-game.component';

describe('CurrentGolfGameComponent', () => {
  let component: CurrentGolfGameComponent;
  let fixture: ComponentFixture<CurrentGolfGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentGolfGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentGolfGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
