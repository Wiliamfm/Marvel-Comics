import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicCardComponent } from './comic-card/comic-card.component';

const routes: Routes = [
  {
    path: "",
    component: ComicCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ComicCardComponent]
})
export class ComicsRoutingModule { }
