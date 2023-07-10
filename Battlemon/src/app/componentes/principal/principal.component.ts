import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/servicios/pokemon.service';
import { URLS } from 'src/app/servicios/urls';
import {
  extraeIdPokemon,
  idRandom,
  desordenaArray,
} from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  aPokemons: Array<any> = [];
  aPokemonsJugador: Array<any> = [];
  imgPokemon: string;
  pokemonCpu: any = {};
  pokemonCpuId: string;

  aEquipoJugador: Array<any> = [];

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.datos();
  }

  datos(): void {
    this._pokemonService.pokemons(1010).subscribe({
      next: (resultado) => {
        this.aPokemons = resultado.results;
        console.log('aPokemons: ', resultado.results);

        this.aPokemonsJugador = desordenaArray(this.aPokemons).slice(0, 10);
        console.log('aPokemonsJugador: ', this.aPokemonsJugador);

        for (let pokemon of this.aPokemonsJugador) {
          pokemon.id = extraeIdPokemon(pokemon.url);
          pokemon.imgPokemon = URLS.URL_IMAGES + pokemon.id + '.png';
        }

        this.pokemonCpu = resultado.results[idRandom()];
        console.log('pokemonCpu: ', this.pokemonCpu);
        this.pokemonCpuId = extraeIdPokemon(this.pokemonCpu.url);
        console.log('pokemonCpuId: ', this.pokemonCpuId);

        this.imgPokemon = URLS.URL_IMAGES + this.pokemonCpuId + '.png';
        console.log('imgPokemon: ', this.imgPokemon);
      },
      error: (error) => {
        this._router.navigate(['error']);
        console.log('error: ', error);
      },
      complete: () => {},
    });
  }

  seleccionarEquipo(id: string): void {
    if (this.aEquipoJugador.length < 3) {
      this.aEquipoJugador.push(id);
    }
    console.log('aEquipoJugador: ', this.aEquipoJugador);

    if (this.aEquipoJugador.length === 3) {
      // Convertimos el array en string para poder enviarlo como parametro
      const pokemonsParam = JSON.stringify(this.aEquipoJugador);
      this._router.navigate(['/equipo'], {
        queryParams: { aEquipoJugador: pokemonsParam },
      });
    }
  }
}
