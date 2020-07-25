import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Player } from 'src/app/models/player.interface';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enter-score',
  templateUrl: './enter-score.page.html',
  styleUrls: ['./enter-score.page.scss'],
})
export class EnterScorePage implements OnInit {

  @Input() players: Player[];

  scoresForm: FormGroup = new FormGroup({
    playerScores: this.fb.array([])
  });
  
  constructor(private modalController: ModalController, private fb: FormBuilder) { }

  get playerScores(): FormArray {
    return this.scoresForm.get('playerScores') as FormArray;
  }
  
  ngOnInit(): void {
    this.players.forEach(() => this.playerScores.controls.push(this.fb.control('')));
  }

  dismissModal(): void {
    this.modalController.dismiss();
  }

  submitForm(): void {
    this.playerScores.controls.forEach((control, index) => {
      this.players[index].score += Number(control.value);
    });

    this.modalController.dismiss({
      nextRound: true
    });
  }

}
