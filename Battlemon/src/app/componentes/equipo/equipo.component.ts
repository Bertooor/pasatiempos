import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/servicios/pokemon.service';
import { URLS } from 'src/app/servicios/urls';
import { extraeIdPokemon } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
})
export class EquipoComponent implements OnInit {
  aPokemons: Array<any> = [];
  idsEquipoJugador: Array<any> = [];
  pokemonsEquipoJugador: Array<any> = [];
  imgPokemon: string;

  constructor(
    private route: ActivatedRoute,
    private _pokemonService: PokemonService,
    private _router: Router
  ) {
    route.queryParams.subscribe((params) => {
      const itemsParam = params['aEquipoJugador'];

      if (itemsParam) {
        this.idsEquipoJugador = JSON.parse(itemsParam);
      }
    });
  }

  ngOnInit(): void {
    this.datos();
  }

  datos(): void {
    this._pokemonService.pokemons(1010).subscribe({
      next: (resultado) => {
        console.log('resultado: ', resultado.results);
        this.aPokemons = resultado.results;

        for (let pokemon of this.aPokemons) {
          pokemon.id = extraeIdPokemon(pokemon.url);
          pokemon.imgPokemon = URLS.URL_IMAGES + pokemon.id + '.png';

          if (
            pokemon.id === this.idsEquipoJugador[0] ||
            pokemon.id === this.idsEquipoJugador[1] ||
            pokemon.id === this.idsEquipoJugador[2]
          ) {
            this.pokemonsEquipoJugador.push(pokemon);
          }
          console.log('pokemonsEquipoJugador: ', this.pokemonsEquipoJugador);
        }
      },
      error: (error) => {
        this._router.navigate(['error']);
        console.error('error: ', error);
      },
      complete: () => {},
    });
  }
}
