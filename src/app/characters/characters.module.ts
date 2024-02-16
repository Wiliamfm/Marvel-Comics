import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    CharactersComponent,
    CharacterDetailsComponent,
    CharacterCardComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule
  ],
  exports: [
    CharactersComponent
  ]
})
export class CharactersModule { }
