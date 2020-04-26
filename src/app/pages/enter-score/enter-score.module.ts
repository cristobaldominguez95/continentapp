import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterScorePageRoutingModule } from './enter-score-routing.module';

import { EnterScorePage } from './enter-score.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterScorePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EnterScorePage]
})
export class EnterScorePageModule {}
