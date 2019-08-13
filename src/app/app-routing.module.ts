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

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'votacao', component: VotacaoComponent },
  { path: 'gestaoPessoal', component: GestaoPessoasComponent },
  { path: 'gestaoUrna', component: GestaoUrnasComponent },
  { path: 'auditoria', component: AuditoriaComponent },
  { path: 'relatorio', component: RelatorioComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule { }
