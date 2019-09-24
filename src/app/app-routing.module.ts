import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { AppComponent } from './app.component';
import { AuditoriaComponent } from './componentesLogin/auditoria/auditoria.component';
import { ComponentesLoginComponent } from './componentesLogin/componentesLogin-component';
// tslint:disable-next-line: max-line-length
import { FormGestaoPessoasEditarComponent } from './componentesLogin/gestao-pessoas/form-gestao-pessoas-editar/form-gestao-pessoas-editar.component';
// tslint:disable-next-line: max-line-length
import { FormGestaoPessoasNovoComponent } from './componentesLogin/gestao-pessoas/form-gestao-pessoas-novo/form-gestao-pessoas-novo.component';
import { GestaoPessoaControllerComponent } from './componentesLogin/gestao-pessoas/gestao-pessoa-controller.component';
import { GestaoPessoasComponent } from './componentesLogin/gestao-pessoas/home-gestao-pessoas/gestao-pessoas.component';
// tslint:disable-next-line: max-line-length
import { FormGestaoUrnaEditarComponent } from './componentesLogin/gestao-urnas/form-gestao-urna-editar/form-gestao-urna-editar.component';
// tslint:disable-next-line: max-line-length
import { FormGestaoUrnaNovoComponent } from './componentesLogin/gestao-urnas/form-gestao-urna-novo/form-gestao-urna-novo.component';
import { GestaoUrnasComponent } from './componentesLogin/gestao-urnas/gestao-urnas.component';
import { HomeComponent } from './componentesLogin/home/home.component';
import { RelatorioComponent } from './componentesLogin/relatorio/relatorio.component';
import { VotacaoComponent } from './componentesLogin/votacao/votacao.component';
import { ComponentesSemLoginComponent } from './componentesSemLogin/componentesSemLogin-component';
import { LoginComponent } from './componentesSemLogin/login/login.component';
import { PageNotFoundComponent } from './componentesSemLogin/page-not-found/page-not-found.component';
import { RegistroComponent } from './componentesSemLogin/registro/registro.component';
import { HomeGestaoUrnaComponent } from './componentesLogin/gestao-urnas/home-gestao-urna/home-gestao-urna.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ComponentesLoginComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'votacao', component: VotacaoComponent },
      { path: 'gestaoPessoal', component: GestaoPessoaControllerComponent, children: [
        {path: '', component: GestaoPessoasComponent},
        {path: 'novo', component: FormGestaoPessoasNovoComponent},
        {path: 'editar/:id', component: FormGestaoPessoasEditarComponent},
      ]},
      { path: 'gestaoUrna', component: GestaoUrnasComponent, children: [
        {path: '', component: HomeGestaoUrnaComponent},
        {path: 'novo', component: FormGestaoUrnaNovoComponent},
        {path: 'editar/:id', component: FormGestaoUrnaEditarComponent},
      ]},
      { path: 'auditoria', component: AuditoriaComponent  },
      { path: 'relatorio', component: RelatorioComponent  },
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
  {path: 'registrar', component: RegistroComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    ),
  ],
  exports: [
    RouterModule,
  ],
})


export class AppRoutingModule { }
