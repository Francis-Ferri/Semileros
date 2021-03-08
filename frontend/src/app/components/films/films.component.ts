import { Component, OnInit } from '@angular/core';
import { Film } from '../../models/film.models';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films: Film[] = [];
  filmsSelected: Film[] = [];
  ableToAdd = true;

  constructor(
    private filmsService: FilmsService
  ) { 
    this.filmsService.getfilms().subscribe(
      (filmsSnapshot) => {
        this.films = [];
        filmsSnapshot = filmsSnapshot.sort(() => 0.5 - Math.random());
        filmsSnapshot = filmsSnapshot.slice(0,50);
        filmsSnapshot.forEach((filmData) => {
          const id = filmData.payload.doc.id;
          const data = filmData.payload.doc.data();
          const film = this.createFilm(id, data);
          this.films.push(film);
        })
        console.log(this.films);
      }
      
    )
  }

  ngOnInit(): void {
    
  }

  createFilm(id, data):Film{
    let film: Film = {
      id: id,
      age: data["Age"],
      country: data["Country"],
      directors: data["Directors"],
      disney: data["Disney"],
      genres: data["Genres"],
      hulu: data["Hulu"],
      iMDb: data["IMDb"],
      language: data["Language"],
      netflix: data["Netflix"],
      primeVideo: data["Prime Video"],
      rottenTomatoes: data["Rotten Tomatoes"],
      runtime: data["Runtime"],
      title: data["Title"],
      year: data["Year"]
    }
    return film;
  }

  addToSelected(index: number){
    const filmsSelected = this.films[index];
    const position = this.filmsSelected.indexOf(filmsSelected);
    if (position === -1 && this.filmsSelected.length < 5){
      this.filmsSelected.push(this.films[index]);
      if(this.filmsSelected.length === 5){
        this.ableToAdd = false;
      }
    } else if(position !== -1){
      this.filmsSelected.splice(position, 1);
      this.ableToAdd = true;
    } else if(position === -1 && this.filmsSelected.length === 5) {
      alert("Ya ha selecionado 5 elementos");
    }
    console.log(this.filmsSelected);
  }

  recommend(){
    alert("Se mando a predecir");
  }

}


