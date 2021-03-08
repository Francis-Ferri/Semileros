import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Film } from 'src/app/models/film.models';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  @Input() film: Film;
  @Input() index: number;
  @Input() ableToAdd: boolean;

  @Output() filmSelected: EventEmitter<number>;

  selected = false;

  constructor() { 
    this.filmSelected = new EventEmitter();
  }

  ngOnInit(): void {
  }

  addToSelected(){
    if (this.ableToAdd || (!this.ableToAdd && this.selected)){
      this.selected = !this.selected;
      this.filmSelected.emit(this.index);
    } else {
      this.filmSelected.emit(this.index);
    }
  }

}
