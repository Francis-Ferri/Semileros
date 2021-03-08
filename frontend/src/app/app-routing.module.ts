import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsComponent } from './components/films/films.component';

const routes: Routes = [
  {path: "try", component: FilmsComponent},
  {path: "report", component: FilmsComponent},
  {path: "**", pathMatch: "full", redirectTo: "try"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
