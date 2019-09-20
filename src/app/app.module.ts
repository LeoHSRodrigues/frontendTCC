import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { MatBadgeModule} from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCheckboxModule} from '@angular/material/checkbox';
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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { getPortuguesPaginatorIntl } from './_helpers/traducaoTabela';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuditoriaComponent } from './componentesLogin/auditoria/auditoria.component';
import { ComponentesLoginComponent } from './componentesLogin/componentesLogin-component';
// tslint:disable-next-line: max-line-length
import { FormGestaoPessoasEditarComponent } from './componentesLogin/gestao-pessoas/form-gestao-pessoas-editar/form-gestao-pessoas-editar.component';
// tslint:disable-next-line: max-line-length
import { FormGestaoPessoasNovoComponent } from './componentesLogin/gestao-pessoas/form-gestao-pessoas-novo/form-gestao-pessoas-novo.component';
import { GestaoPessoaControllerComponent } from './componentesLogin/gestao-pessoas/gestao-pessoa-controller.component';
import { GestaoPessoasComponent } from './componentesLogin/gestao-pessoas/home-gestao-pessoas/gestao-pessoas.component';
import { GestaoUrnasComponent } from './componentesLogin/gestao-urnas/gestao-urnas.component';
import { HomeComponent } from './componentesLogin/home/home.component';
import { ComponentesnavsComponent } from './componentesLogin/navs/navs.component';
import { RelatorioComponent } from './componentesLogin/relatorio/relatorio.component';
import { VotacaoComponent } from './componentesLogin/votacao/votacao.component';
import { ComponentesSemLoginComponent } from './componentesSemLogin/componentesSemLogin-component';
import { LoginComponent } from './componentesSemLogin/login/login.component';
import { PageNotFoundComponent } from './componentesSemLogin/page-not-found/page-not-found.component';
import { RegistroComponent } from './componentesSemLogin/registro/registro.component';

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
  ],
  // tslint:disable-next-line: object-literal-sort-keys
  bootstrap: [AppComponent],
  entryComponents: [],
  providers: [{ provide: MatPaginatorIntl, useValue: getPortuguesPaginatorIntl() }],
})

export class AppModule {

  public events: string[] = [];
  public opened: boolean;

 }
