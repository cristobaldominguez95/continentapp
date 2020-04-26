import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterScorePage } from './enter-score.page';

const routes: Routes = [
  {
    path: '',
    component: EnterScorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterScorePageRoutingModule {}
