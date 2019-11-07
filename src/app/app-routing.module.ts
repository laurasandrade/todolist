import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { PollPage } from './pages/poll/poll.page';
import { ReportPage } from './pages/report/report.page';
import { AnswersListPage } from './pages/answers-list/answers-list.page';
import { DispositivosPage } from './pages/dispositivos/dispositivos.page';
import { ResearchByHourComponent } from './pages/research-by-hour/research-by-hour.component';
import { BranchComponent } from './pages/branch/branch.component';
import { BannerComunicacaoComponent } from './pages/banner-comunicacao/banner-comunicacao.component';
import { CreateUsersComponent } from './pages/create-users/create-users.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'polls', component: PollPage },
  { path: 'report', component: ReportPage },
  { path: 'report/:branch', component: ReportPage },
  { path: 'answers-list', component: AnswersListPage },
  { path: 'answers-list/:branch', component: AnswersListPage },
  { path: 'research-by-hour/:branch', component: ResearchByHourComponent },
  { path: 'dispositivos', component: DispositivosPage },
  { path: 'banner-comunicacao', component: BannerComunicacaoComponent },
  { path: 'branch', component: BranchComponent },
  { path: 'create-users', component: CreateUsersComponent },
  { path: 'list-users', component: ListUsersComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
