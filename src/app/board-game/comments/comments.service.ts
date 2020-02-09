import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BoardGameComment } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(readonly httpClient : HttpClient) { }

  createNewComment(newComment : BoardGameComment): Promise<string>{
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    return this.httpClient.post('/api/comment/new', 
    JSON.stringify(newComment),
    {headers: headers})
    .toPromise()
    .then(insertedId=> {console.log('successfully posted to express'); return insertedId as string})
    .catch(err=> {console.error ('error passing to node', err); return ""});
  }

  getExistingCommentsForBoardGame(id : number) : Promise<BoardGameComment []>{
    return this.httpClient.get<BoardGameComment[]>('/api/comments/'+id).toPromise();

  }

  getComment(id : string): Promise<BoardGameComment>{

    return this.httpClient.get<BoardGameComment>('/api/comment/'+id)
    .toPromise()
  }
}
