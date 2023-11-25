import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, skip, map } from 'rxjs';
import { Pokemon } from './models/pokemon';
import { environments } from 'src/environments/environments';
import { Url } from './models/url';
import { Setup } from './models/setup';
import { Game } from './models/game';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient) { }

  private _pokemon$ = new BehaviorSubject<Pokemon>(new Pokemon);
  private _game$ = new BehaviorSubject<Pokemon>(new Pokemon);

  get pokemon$() {
    return this._pokemon$.asObservable();
  } 

  get game$() {
    return this._pokemon$.asObservable().pipe(
      map((pokemon: Pokemon) => {
        const images: string[] = [];
        images.push(pokemon.gameURL[1]);
        images.push(pokemon.gameURL[2]);
        images.push(pokemon.gameURL[3]);
        images.push(pokemon.gameURL[4]);
        images.push(pokemon.gameURL[5]);
        images.push(pokemon.gameURL[6]);
        images.push(pokemon.gameURL[0]);
        return images;
      })
    )
  }

  genRandomDex() : number {
    let dex:number = Math.round(Math.random() * (1010 - 1) + 1);
    return dex;
  }

  getPokemon() : void {
    this.http.get<Pokemon>(`${environments.apiUrl}`).pipe(
      tap(p => {
        this._pokemon$.next(p);
      })
    ).subscribe();
  }

  // getGame(setup:Setup) : void {
  //   if (setup.url !== undefined) {
  //     //console.log(setup);
  //     const headers:HttpHeaders = new HttpHeaders({
  //       "Content-Type" : "application/json"
  //     });
  //     this.http.post<Game>(`${environments.apiUrl}/game/`, setup, {headers}).pipe(
  //       tap((game:Game) => {
  //         this._game$.next(game);
  //         //console.log(game);
  //       })
  //     ).subscribe();
  //   } 
  // }


}

//   getRandomPokemon() : void {
//     let nb:number = Math.round(Math.random() * (1010 - 1) + 1);
//     this.http.get<Pokemon>(`${environments.apiUrl}/pokemon/` + nb).pipe(
//       tap(p => {
//         this._pokemon$.next(p);
//       })
//     ).subscribe();
//   }

//   getImgUrl(name:string) : void {
//     if (name !== undefined) {
//       this.http.get<Url>(`${environments.apiUrl}/image/`+ name).pipe(
//         tap(u => {
//             this._url$.next(u);
//         })
//       ).subscribe(); 
//     }
//   } 

//   getShadow(name:string) : void {
//     if (name !== undefined) {
//       this.http.get<Url>(`${environments.apiUrl}/shadow/`+ name).pipe(
//         tap(s => {
//           this._shadow$.next(s);
//         })
//       ).subscribe();
//     }
//   }

//   getGame(setup:Setup) : void {
//     if (setup.url !== undefined) {
//       //console.log(setup.url);
//       const headers:HttpHeaders = new HttpHeaders({
//         "Content-Type" : "application/json"
//       });
//       this.http.post<Game>(`${environments.apiUrl}/game/setup`, setup, {headers}).pipe(
//         tap((game:Game) => {
//           this._image$.next(game);
//           //console.log(game.game);
//           //console.log(game.url);
//         })
//       ).subscribe();
//     }
//   }

//   getHint(setup:Setup) : void {
//     if (setup.url !== undefined && setup.game !== undefined) {
//       //console.log(setup.url);
//       const headers:HttpHeaders = new HttpHeaders({
//         "Content-Type" : "application/json"
//       });
//       this.http.post<Game>(`${environments.apiUrl}/game/hint`, setup, {headers}).pipe(
//         tap((game:Game) => {
//           this._image$.next(game);
//           //console.log(game.url);
//         })
//       ).subscribe();
//     }
//   }

// }
