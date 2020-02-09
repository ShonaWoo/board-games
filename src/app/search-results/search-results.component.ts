import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BoardGamesService } from '../board-games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardGameSimple } from '../models';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log('property changed!');
    this.ngOnInit();
  }

  @Input()
  searchInput : string; 

  boardgames : BoardGameSimple[];

  constructor(readonly boardgamesService : BoardGamesService, readonly activatedRoute : ActivatedRoute, readonly router : Router) { }

  ngOnInit() {
    if(this.searchInput){
      this.boardgamesService.searchBoardGames(this.searchInput)
    .then(res => {this.boardgames = res; console.log('successfully received board games list from node')})
    .catch(error=> console.log(error))
    }
    else{
      this.boardgames = [];
    }  
  }

  selectBoardGame(id: number){

  }

}
