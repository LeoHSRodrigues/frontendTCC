import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentesSemLogin/login/login.component';
import { HomeComponent } from './componentesLogin/home/home.component';
import { ComponentesLoginComponent } from './componentesLogin/componentesLogin-component';
import { VotacaoComponent } from './componentesLogin/votacao/votacao.component';
import { GestaoPessoasComponent } from './componentesLogin/gestao-pessoas/gestao-pessoas.component';
import { GestaoUrnasComponent } from './componentesLogin/gestao-urnas/gestao-urnas.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { RelatorioComponent } from './componentesLogin/relatorio/relatorio.component';
import { PageNotFoundComponent } from './componentesSemLogin/page-not-found/page-not-found.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ComponentesSemLoginComponent } from './componentesSemLogin/componentesSemLogin-component';
import { RegistroComponent } from './componentesSemLogin/registro/registro.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ComponentesLoginComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'votacao', component: VotacaoComponent, },
      { path: 'gestaoPessoal', component: GestaoPessoasComponent,  },
      { path: 'gestaoUrna', component: GestaoUrnasComponent,  },
      { path: 'auditoria', component: AuditoriaComponent,  },
      { path: 'relatorio', component: RelatorioComponent,  },
    ]
  },
  {
    path: '',
    component: ComponentesSemLoginComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ],
  },
  {path: 'registrar', component: RegistroComponent},
  { path: '**', component: PageNotFoundComponent }
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
