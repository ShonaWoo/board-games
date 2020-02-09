import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchInput = '';

  constructor(readonly router : Router) { }

  ngOnInit() {
  }

  checkIfEnterPressed(event){
    if(event.keyCode === 13){
      console.log('enter pressed')
    }
  }

}
