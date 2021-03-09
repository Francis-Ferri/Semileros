import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilmPredict } from '../models/film.models';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private url = "http://localhost:5000"
  
  constructor(private http: HttpClient) { }

  predict(film: FilmPredict) {
    return this.http.post(this.url, film.data).toPromise();
  }
}
