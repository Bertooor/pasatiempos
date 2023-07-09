import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/servicios/pokemon.service';
import { URLS } from 'src/app/servicios/urls';

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

        this.aPokemonsJugador = this.desordenaArray(this.aPokemons).slice(
          0,
          10
        );
        console.log('aPokemonsJugador: ', this.aPokemonsJugador);

        for (let pokemon of this.aPokemonsJugador) {
          pokemon.id = this.extraeIdPokemon(pokemon.url);
          pokemon.imgPokemon = URLS.URL_IMAGES + pokemon.id + '.png';
        }

        this.pokemonCpu = resultado.results[this.idRandom()];
        console.log('pokemonCpu: ', this.pokemonCpu);
        this.pokemonCpuId = this.extraeIdPokemon(this.pokemonCpu.url);
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

  idRandom(): string {
    return Math.floor(Math.random() * 1010 + 1).toString();
  }

  desordenaArray(arr: any) {
    return arr.sort(() => Math.random() - 0.5);
  }

  extraeIdPokemon(url: string): string {
    let id: string = url.slice(34, -1);
    return id;
  }

  seleccionarEquipo(id: string): void {
    if (this.aEquipoJugador.length < 3) {
      this.aEquipoJugador.push(id);
    }
    console.log('aEquipoJugador: ', this.aEquipoJugador);

    if (this.aEquipoJugador.length === 3) {
      this._router.navigate(['/equipo']);
    }
  }
}
