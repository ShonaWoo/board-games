import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

//models
import {BoardGameSimple, BoardGameDetailed} from './models'

@Injectable({
  providedIn: 'root'
})
export class BoardGamesService {

  //inject httpClient
  constructor(readonly httpClient : HttpClient) { }

  searchBoardGames(searchInput : string): Promise<BoardGameSimple[]>{
    return(
      this.httpClient.get<any[]>('/api/boardgames/'+searchInput)
      .toPromise()
      .then(res=>{
        return res.map(bg=>
          <BoardGameSimple>{
            id : bg.id,
            name : bg.primary,
            boardgameCategories : this.convertToArray(bg.boardgamecategory),
            thumbnail : bg.thumbnail,
            avgScore: bg.average
        } 
      );
      })
      .catch(err=>{console.log('service cannot receive!', err); return null;})

    );

  }

  private convertToArray(boardgamecategory: string) : string[]{
    let categoriesStr = boardgamecategory.slice(1,-1);
    return categoriesStr.split(", ", 3).map(x=>x.slice(1,-1));
  }

  getBoardGameDetails(id : number): Promise<BoardGameDetailed>{
    return(
      this.httpClient.get<any>('/api/boardgame/'+ id)
      .toPromise()
      .then(res=>{
        return <BoardGameDetailed>{
          id : res.id,
          name: res.primary,
          image : res.image,
          description : this.shortenDescription(res.description),
          boardgameRank : res['Board Game Rank'],
          yearPublished : res.yearpublished,
          bayesAvg: res.bayesaverage,
          usersRated: res.usersrated,
          url: res.url
        }
      })

    );

  }
  shortenDescription(description: string): string {
    let ind = description.indexOf("&#10");
    if (ind > 0){
      return description.slice(0, ind);
    }
    return description;
  }
}
