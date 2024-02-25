import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CharactersComponent } from './characters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComicsModule } from '../comics/comics.module';


@NgModule({
  declarations: [
    CharactersComponent,
    CharacterDetailsComponent,
    CharacterCardComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    ReactiveFormsModule,
    ComicsModule,
  ],
  exports: [
    CharactersComponent
  ]
})
export class CharactersModule { }
