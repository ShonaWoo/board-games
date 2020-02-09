import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BoardGameComponent } from './board-game/board-game.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'boardgamedetails/:id', component: BoardGameComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
