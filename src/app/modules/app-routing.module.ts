import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from '../components/create-game/create-game.component';
import { CurrentGolfGameComponent } from '../components/current-golf-game/current-golf-game.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'createGame', component: CreateGameComponent },
  { path: 'currentGolfGame', component: CurrentGolfGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
