import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VotacaoComponent } from './votacao/votacao.component';
import { GestaoPessoasComponent } from './gestao-pessoas/gestao-pessoas.component';
import { GestaoUrnasComponent } from './gestao-urnas/gestao-urnas.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_helpers/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'votacao', component: VotacaoComponent, canActivate: [AuthGuard]},
  { path: 'gestaoPessoal', component: GestaoPessoasComponent, canActivate: [AuthGuard] },
  { path: 'gestaoUrna', component: GestaoUrnasComponent, canActivate: [AuthGuard] },
  { path: 'auditoria', component: AuditoriaComponent, canActivate: [AuthGuard] },
  { path: 'relatorio', component: RelatorioComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule { }
