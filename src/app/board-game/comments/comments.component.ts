import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommentsService } from './comments.service';
import { BoardGameComment } from 'src/app/models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input()
  boardgameId: number;

  @Input()
  newCommentId: string;
  exisitingComments: BoardGameComment[] = [];

  constructor(readonly commentsService: CommentsService) { }

  ngOnInit() {
    //get existing comments
    this.commentsService.getExistingCommentsForBoardGame(this.boardgameId).then(comments=>this.exisitingComments =comments).catch();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.newCommentId = changes.newCommentId.currentValue
    if(this.newCommentId){
      this.commentsService.getComment(this.newCommentId).then(newComment=>this.exisitingComments.unshift(newComment)).catch()
    }
    
  }
  
}
