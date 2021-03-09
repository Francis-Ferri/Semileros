import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Film, FilmPredict } from '../../models/film.models';
import { FilmsService } from '../../services/films.service';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films: Film[] = [];
  filmsSelected: Film[] = [];
  ableToAdd = true;
  results = {
    "Disney+": 0,
    Hulu: 0,
    Netflix: 0,
    "Prime Video": 0
  };

  constructor(
    private filmsService: FilmsService,
    private predictionService: PredictionService
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
        });
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

  async recommend(){
    const results = {
      "Disney+": 0,
      Hulu: 0,
      Netflix: 0,
      "Prime Video": 0
    };
    await Promise.all(this.filmsSelected.map( async (film) => {
      const filmPredict = new FilmPredict(film);
      const data = await this.predictionService.predict(filmPredict);
      results["Disney+"] += data["Disney+"];
      results["Hulu"] += data["Hulu"];
      results["Netflix"] += data["Netflix"];
      results["Prime Video"] += data["Prime Video"];
    }));
    results["Disney+"] /= this.filmsSelected.length;
    results["Hulu"] /= this.filmsSelected.length;
    results["Netflix"] /= this.filmsSelected.length;
    results["Prime Video"] /= this.filmsSelected.length;
    this.results = results;
  }



}


/*
const results = {
      "Disney+": 0,
      Hulu: 0,
      Netflix: 0,
      "Prime Video": 0
    }
for (const filmSelected of this.filmsSelected) {
      let predicted =  this.predictionService.predict(filmSelected);
      
      predicted.subscribe((data) => {
        results["Disney+"] = data["Disney+"];
        results["Hulu"] = data["Hulu"];
        results["Netflix"] = data["Netflix"];
        results["Prime Video"] = data["Prime Video"];
      });
    }
        results["Disney+"] = data["Disney+"];
        results["Hulu"] = data["Hulu"];
        results["Netflix"] = data["Netflix"];
        results["Prime Video"] = data["Prime Video"];

    results["Disney+"] /= this.filmsSelected.length;
    results["Hulu"] /= this.filmsSelected.length;
    results["Netflix"] /= this.filmsSelected.length;
    results["Prime Video"] /= this.filmsSelected.length;

    //console.log(results);
*/