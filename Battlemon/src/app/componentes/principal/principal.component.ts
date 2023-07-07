import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/servicios/pokemon.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  aPokemons: Array<any> = [];
  aPokemonsJugador: Array<any> = [10];

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.datos();
  }

  datos(): void {
    this._pokemonService.pokemons(this.idRandom()).subscribe({
      next: (resultado) => {
        console.log('resultado: ', resultado);
      },
      error: (error) => {
        this._router.navigate(['error']);
        console.log('error: ', error);
      },
      complete: () => {},
    });
  }

  idRandom(): string {
    return Math.floor(Math.random() * (1010 - 1 + 1) + 1).toString();
  }
}
