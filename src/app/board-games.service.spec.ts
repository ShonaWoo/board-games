import { TestBed } from '@angular/core/testing';

import { BoardGamesService } from './board-games.service';

describe('BoardGamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardGamesService = TestBed.get(BoardGamesService);
    expect(service).toBeTruthy();
  });
});
