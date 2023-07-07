import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from './urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  url: string;

  constructor(private _http: HttpClient) {
    this.url = URLS.API_URL;
  }

  pokemons(id: string): Observable<any> {
    return this._http.get(this.url + id);
  }
}
