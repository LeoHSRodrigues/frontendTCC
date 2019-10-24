import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { RedirecionadorComponent } from './_helpers/redirecionador/redirecionador.component';
import { AppComponent } from './app.component';
import { AuditoriaComponent } from './componentesLogin/auditoria/auditoria.component';
import { ComponentesLoginComponent } from './componentesLogin/componentesLogin-component';
import { FormGestaoPessoasEditarComponent } from './componentesLogin/gestao-pessoas/form-gestao-pessoas-editar/form-gestao-pessoas-editar.component';
import { FormGestaoPessoasNovoComponent } from './componentesLogin/gestao-pessoas/form-gestao-pessoas-novo/form-gestao-pessoas-novo.component';
import { GestaoPessoaControllerComponent } from './componentesLogin/gestao-pessoas/gestao-pessoa-controller.component';
import { GestaoPessoasComponent } from './componentesLogin/gestao-pessoas/home-gestao-pessoas/gestao-pessoas.component';
import { FormGestaoUrnaEditarComponent } from './componentesLogin/gestao-urnas/form-gestao-urna-editar/form-gestao-urna-editar.component';
import { FormGestaoUrnaNovoComponent } from './componentesLogin/gestao-urnas/form-gestao-urna-novo/form-gestao-urna-novo.component';
import { GestaoUrnasComponent } from './componentesLogin/gestao-urnas/gestao-urnas.component';
import { HomeGestaoUrnaComponent } from './componentesLogin/gestao-urnas/home-gestao-urna/home-gestao-urna.component';
import { FormGestaoVotacaoEditarComponent } from './componentesLogin/gestao-votacao/form-gestao-votacao-editar/form-gestao-votacao-editar.component';
import { FormGestaoVotacaoNovoComponent } from './componentesLogin/gestao-votacao/form-gestao-votacao-novo/form-gestao-votacao-novo.component';
import { HomeGestaoVotacaoComponent } from './componentesLogin/gestao-votacao/home-gestao-votacao/home-gestao-votacao.component';
import { VotacaoComponent } from './componentesLogin/gestao-votacao/votacao.component';
import { HomeComponent } from './componentesLogin/home/home.component';
import { RelatorioComponent } from './componentesLogin/relatorio/relatorio.component';
import { ComponentesSemLoginComponent } from './componentesSemLogin/componentesSemLogin-component';
import { LoginComponent } from './componentesSemLogin/login/login.component';
import { PageNotFoundComponent } from './componentesSemLogin/page-not-found/page-not-found.component';
import { RegistroComponent } from './componentesSemLogin/registro/registro.component';
import { VotarComponent } from './componentesSemLogin/votar/votar.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ComponentesLoginComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      {
        path: 'gestaoPessoal', component: GestaoPessoaControllerComponent, canActivateChild: [AuthGuard], children: [
          { path: '', component: GestaoPessoasComponent },
          { path: 'novo', component: FormGestaoPessoasNovoComponent },
          { path: 'editar/:id', component: FormGestaoPessoasEditarComponent },
        ],
      },
      {
        path: 'gestaoUrna', component: GestaoUrnasComponent, canActivateChild: [AuthGuard], children: [
          { path: '', component: HomeGestaoUrnaComponent },
          { path: 'novo', component: FormGestaoUrnaNovoComponent },
          { path: 'editar/:id', component: FormGestaoUrnaEditarComponent },
        ],
      },
      {
        path: 'votacao', component: VotacaoComponent, children: [
          { path: '', component: HomeGestaoVotacaoComponent },
          { path: 'novo', component: FormGestaoVotacaoNovoComponent },
          { path: 'editar', component: FormGestaoVotacaoEditarComponent },
        ],
      },
      { path: 'auditoria', component: AuditoriaComponent },
      { path: 'relatorio', component: RelatorioComponent },
    ],
  },
  {
    path: '',
    component: ComponentesSemLoginComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  { path: 'votar', component: VotarComponent },
  { path: 'teste', component: RedirecionadorComponent },
  { path: 'registrar', component: RegistroComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { onSameUrlNavigation: 'reload' },
    ),
  ],
  exports: [
    RouterModule,
  ],
})


export class AppRoutingModule { }
