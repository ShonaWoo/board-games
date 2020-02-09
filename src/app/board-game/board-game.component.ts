import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardGamesService } from '../board-games.service';
import { BoardGameDetailed } from '../models';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})
export class BoardGameComponent implements OnInit {

  //boardgame : BoardGameDetailed;
  boardgameId: number;
  newCommentId: string;

  constructor(readonly activatedRoute : ActivatedRoute, readonly boardgameService : BoardGamesService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params.id;
    this.boardgameId = id;
    // this.boardgameService.getBoardGameDetails(id)
    // .then(res=> this.boardgame = res)
    // .catch(error => console.log ('error getting single boardgame from service'));
  }

  newCommentCreated(event: any){
    this.newCommentId = event
  }

}
