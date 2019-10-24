import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatCardModule, MatDialog, MatDialogModule, MatPaginatorIntl, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatBadgeModule} from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatListModule} from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSliderModule} from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule, MatStepperNext } from '@angular/material/stepper';
import { MatTableModule} from '@angular/material/table';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTooltipModule} from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NumerosApenasDirective } from './_helpers/numeros-apenas.directive';
import { ProximoDirective } from './_helpers/proximo.directive';
import { RedirecionadorComponent } from './_helpers/redirecionador/redirecionador.component';
import { getPortuguesPaginatorIntl } from './_helpers/traducaoTabela';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuditoriaComponent } from './componentesLogin/auditoria/auditoria.component';
import { ComponentesLoginComponent } from './componentesLogin/componentesLogin-component';
import { DialogoConfirmacaoComponent } from './componentesLogin/dialogo-confirmacao/dialogo-confirmacao.component';
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
// tslint:disable-next-line: max-line-length
import { HomeGestaoUrnaComponent } from './componentesLogin/gestao-urnas/home-gestao-urna/home-gestao-urna.component';
// tslint:disable-next-line: max-line-length
import { FormGestaoVotacaoEditarComponent } from './componentesLogin/gestao-votacao/form-gestao-votacao-editar/form-gestao-votacao-editar.component';
// tslint:disable-next-line: max-line-length
import { FormGestaoVotacaoNovoComponent } from './componentesLogin/gestao-votacao/form-gestao-votacao-novo/form-gestao-votacao-novo.component';
// tslint:disable-next-line: ordered-imports
// tslint:disable-next-line: max-line-length
import { HomeGestaoVotacaoComponent } from './componentesLogin/gestao-votacao/home-gestao-votacao/home-gestao-votacao.component';
import { VotacaoComponent } from './componentesLogin/gestao-votacao/votacao.component';
import { HomeComponent } from './componentesLogin/home/home.component';
import { ModalCandidatoComponent } from './componentesLogin/modal-candidato/modal-candidato.component';
import { ComponentesnavsComponent } from './componentesLogin/navs/navs.component';
import { RelatorioComponent } from './componentesLogin/relatorio/relatorio.component';
import { ComponentesSemLoginComponent } from './componentesSemLogin/componentesSemLogin-component';
import { DialogoUrnaComponent } from './componentesSemLogin/dialogo-urna/dialogo-urna.component';
import { LoginComponent } from './componentesSemLogin/login/login.component';
import { PageNotFoundComponent } from './componentesSemLogin/page-not-found/page-not-found.component';
import { RegistroComponent } from './componentesSemLogin/registro/registro.component';
import { VotarComponent } from './componentesSemLogin/votar/votar.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    VotacaoComponent,
    GestaoPessoasComponent,
    GestaoUrnasComponent,
    AuditoriaComponent,
    RelatorioComponent,
    PageNotFoundComponent,
    ComponentesLoginComponent,
    ComponentesSemLoginComponent,
    ComponentesnavsComponent,
    RegistroComponent,
    FormGestaoPessoasNovoComponent,
    FormGestaoPessoasEditarComponent,
    GestaoPessoaControllerComponent,
    DialogoConfirmacaoComponent,
    FormGestaoUrnaEditarComponent,
    FormGestaoUrnaNovoComponent,
    HomeGestaoUrnaComponent,
    VotarComponent,
    ProximoDirective,
    HomeGestaoVotacaoComponent,
    FormGestaoVotacaoNovoComponent,
    FormGestaoVotacaoEditarComponent,
    ModalCandidatoComponent,
    NumerosApenasDirective,
    RedirecionadorComponent,
    DialogoUrnaComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatTableModule,
    RouterModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(options),
    AppRoutingModule,
    NgxChartsModule,
    SocketIoModule.forRoot(config),
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
    MatTooltipModule,
    EcoFabSpeedDialModule,
  ],
  // tslint:disable-next-line: object-literal-sort-keys
  bootstrap: [AppComponent],
  entryComponents: [DialogoConfirmacaoComponent, ModalCandidatoComponent, DialogoUrnaComponent],
  providers: [{ provide: MatPaginatorIntl, useValue: getPortuguesPaginatorIntl() }, {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
})

export class AppModule {

  public events: string[] = [];
  public opened: boolean;

 }
