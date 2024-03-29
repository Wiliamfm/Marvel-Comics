import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "characters",
    loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule)
  },
  {
    path: "**",
    redirectTo: "characters",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
