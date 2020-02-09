import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardGameComment } from 'src/app/models';
import { CommentsService } from '../comments/comments.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  @Input()
  id: number;

  @Output()
  formSubmit: EventEmitter<string> = new EventEmitter();

  commenter: string = '';
  comment: string = '';
  exisitingComments: BoardGameComment[] = [];

  constructor(readonly commentsService: CommentsService) { }

  ngOnInit() {
  }

  submitNewComment() {
    if (this.comment) {
      //construct new Comment object first
      let newComment = new BoardGameComment();
      if(this.commenter){
        newComment.commenter = this.commenter;        
      }
      newComment.boardgameId = this.id;
      newComment.content = this.comment;

      //pass new comment object to service
      this.commentsService.createNewComment(newComment)
      .then(result=> {
        if(result){
          this.formSubmit.emit(result);
          // this.exisitingComments.unshift(newComment);
          this.comment = '';
          this.commenter = '';
        }
        else{
          console.log('aw shucks');
        }
      });
    }

  }

}
