export interface BoardGameSimple{
    id : number,
    thumbnail : string,
    name : string,
    boardgameCategories : string[],
    avgScore: number
}

export interface BoardGameDetailed extends BoardGameSimple{
    image : string,
    description : string,
    boardgameRank : number,
    yearPublished : number,
    bayesAvg: number,
    usersRated: number,
    url: string

}

export class BoardGameComment{
    _id: string;
    boardgameId : number;
    commenter: string = 'Anonymous';
    content: string;

    // constructor(content: string, boardgameId: number, commenter: string){
    //     this.boardgameId = boardgameId;
    //     this.commenter = commenter;
    //     this.content= content;
    // }
}