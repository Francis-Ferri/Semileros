
export interface Film {
  id:string;
  age: string;
  country: string[];
  directors: string[];
  disney: number;
  genres: string[];
  hulu: number;
  iMDb: number;
  language: string[];
  netflix: number;
  primeVideo: number;
  rottenTomatoes: string;
  runtime: number;
  title: string;
  year: string;
  }

export class FilmPredict {
  data = {
    Action: false,
    Adventure: false,
    Animation: false,
    Biography: false,
    Comedy: false,
    Crime: false,
    Documentary: false,
    Drama: false,
    Family: false,
    Fantasy: false,
    Film_Noir: false,
    History: false,
    Horror: false,
    IMDb: 0,
    Music: false,
    Musical: false,
    Mystery: false,
    News: false,
    Reality_TV: false,
    Romance: false,
    Rotten_Tomatoes: 0,
    Runtime: 0,
    Sci_Fi: false,
    Short: false,
    Sport: false,
    Talk_Show: false,
    Thriller: false,
    War: false,
    Western: false,
    Year: ""
  }

  constructor(film: Film) {
    this.data["IMDb"] = film.iMDb;
    this.data["Rotten_Tomatoes"] = parseInt(film.rottenTomatoes.slice(0, -1));
    this.data["Runtime"] = film.runtime;
    this.data["Year"] = film.age;
    for (const genre of film.genres) {
        if (genre === 'Sci-Fi'){
          this.data['Sci_Fi'] = true;
        } else {
          this.data[genre] = true;
        }
    }
  }
}