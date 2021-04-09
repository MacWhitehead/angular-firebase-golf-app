import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGamesTableComponent } from './view-games-table.component';

describe('ViewGamesTableComponent', () => {
  let component: ViewGamesTableComponent;
  let fixture: ComponentFixture<ViewGamesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGamesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGamesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
