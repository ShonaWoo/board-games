import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common'
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//for angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsModule } from './materials.module';
import {MatIconModule} from '@angular/material/icon';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BoardGameComponent } from './board-game/board-game.component';
import {CommentsComponent} from './board-game/comments/comments.component';
import { SearchComponent } from './search/search.component'
import { BoardGamesService } from './board-games.service';
import { CommentsService } from './board-game/comments/comments.service';
import { BoardGameDetailsComponent } from './board-game/board-game-details/board-game-details.component';
import { InputFormComponent } from './board-game/input-form/input-form.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    BoardGameComponent,
    CommentsComponent,
    SearchComponent,
    BoardGameDetailsComponent,
    InputFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MaterialsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BoardGamesService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
