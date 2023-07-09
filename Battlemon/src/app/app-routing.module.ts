import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { EquipoComponent } from './componentes/equipo/equipo.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'home', component: PrincipalComponent },
  { path: 'equipo', component: EquipoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
