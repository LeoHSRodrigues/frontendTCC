import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VotacaoComponent } from './votacao/votacao.component';
import { GestaoPessoasComponent } from './gestao-pessoas/gestao-pessoas.component';
import { GestaoUrnasComponent } from './gestao-urnas/gestao-urnas.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSliderModule} from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { MatBadgeModule} from '@angular/material/badge';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material';
import { getPortuguesPaginatorIntl } from './_helpers/traducaoTabela';
import { SomeService } from './gestao-pessoas/temporario';



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
    AppRoutingModule
  ],
  providers: [SomeService, { provide: MatPaginatorIntl, useValue: getPortuguesPaginatorIntl() }],
  bootstrap: [AppComponent]
})

export class AppModule {

  events: string[] = [];
  opened: boolean;

 }
