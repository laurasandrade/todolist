import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpModule } from "@angular/http";
// tslint:disable-next-line:max-line-length
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from "@angular/material";

import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginPage } from "./pages/login/login.page";
import { PollPage } from "./pages/poll/poll.page";
import { ReportPage } from "./pages/report/report.page";
import { AnswersListPage } from "./pages/answers-list/answers-list.page";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { GraficosComponent } from "./components/graficos/graficos.component";
import { TableListComponent } from "./components/table-list/table-list.component";
import { SubmenuComponent } from "./components/submenu/submenu.component";
import { FilterDatesAndAnotherComponent } from "./components/filter-dates-and-another/filter-dates-and-another.component";

import { AuthService } from "./services/auth.service";
import { PollService } from "./services/poll.service";
import { BranchService } from "./services/branch.service";

import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { A11yModule } from "@angular/cdk/a11y";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { JwPaginationComponent } from "jw-angular-pagination";
import { NgxPaginationModule } from "ngx-pagination";
import { ListaRespostasService } from "./services/listaRespostas.service";
import { CommonModule, DatePipe } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
import { DispositivosPage } from "./pages/dispositivos/dispositivos.page";
import { DispositivosService } from "./services/dispositivos.service";
import "hammerjs";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from "src/app/shared/format-datepicker";
import { BannerComunicacaoComponent } from "./pages/banner-comunicacao/banner-comunicacao.component";
import { ResearchByHourComponent } from "./pages/research-by-hour/research-by-hour.component";
import { BranchComponent } from "./pages/branch/branch.component";
import { ModalBranchComponent } from "./pages/branch/modal-branch.component";
import { CreateUsersComponent } from "./pages/create-users/create-users.component";
import { ListUsersComponent } from "./pages/list-users/list-users.component";
import { SelectUnitComponent } from "./components/select-unit/select-unit.component";
import { MatProgressButtonsModule } from "mat-progress-buttons";

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    PollPage,
    ReportPage,
    AnswersListPage,
    DispositivosPage,
    HeaderComponent,
    FooterComponent,
    GraficosComponent,
    TableListComponent,
    JwPaginationComponent,
    SubmenuComponent,
    FilterDatesAndAnotherComponent,
    BannerComunicacaoComponent,
    ResearchByHourComponent,
    BranchComponent,
    ModalBranchComponent,
    CreateUsersComponent,
    ListUsersComponent,
    SelectUnitComponent
  ],
  imports: [
    HttpModule,
    ChartsModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    NgbModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    CommonModule,
    ToastrModule.forRoot(),
    MatProgressButtonsModule.forRoot()
  ],
  exports: [
    PollPage,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule
  ],
  entryComponents: [ModalBranchComponent],
  providers: [
    AuthService,
    PollService,
    DispositivosService,
    ListaRespostasService,
    DatePipe,
    BranchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
