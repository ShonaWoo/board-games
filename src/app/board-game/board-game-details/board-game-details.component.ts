import { Component, OnInit, Input } from '@angular/core';
import { BoardGameDetailed } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { BoardGamesService } from 'src/app/board-games.service';

@Component({
  selector: 'app-board-game-details',
  templateUrl: './board-game-details.component.html',
  styleUrls: ['./board-game-details.component.css']
})
export class BoardGameDetailsComponent implements OnInit {

  @Input('id')
  boardgameId: number;
  boardgame : BoardGameDetailed;

  constructor(readonly activatedRoute : ActivatedRoute, readonly boardgameService : BoardGamesService) { }

  ngOnInit() {
    // const id = +this.activatedRoute.snapshot.params.id;
    this.boardgameService.getBoardGameDetails(this.boardgameId)
    .then(res=> {this.boardgame = res})
    .catch(error => console.log ('error getting single boardgame from service'));
  }

  navigateToSite(){
    window.open(this.boardgame.url)
  }

}
