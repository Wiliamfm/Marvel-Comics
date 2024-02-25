import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicCardComponent } from './comic-card/comic-card.component';
@NgModule({
  declarations: [
    ComicCardComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ComicCardComponent
  ]
})
export class ComicsModule { }
