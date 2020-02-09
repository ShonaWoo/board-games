import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameDetailsComponent } from './board-game-details.component';

describe('BoardGameDetailsComponent', () => {
  let component: BoardGameDetailsComponent;
  let fixture: ComponentFixture<BoardGameDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGameDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGameDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
