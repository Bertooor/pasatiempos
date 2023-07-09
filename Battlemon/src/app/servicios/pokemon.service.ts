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

  pokemon(id: string): Observable<any> {
    return this._http.get(this.url + id);
  }

  pokemons(nPokemons: number): Observable<any> {
    return this._http.get(this.url + '?limit=' + nPokemons + '&offset=0');
  }
}
