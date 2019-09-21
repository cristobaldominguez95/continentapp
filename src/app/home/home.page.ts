import { Component } from '@angular/core';
import { Player } from '../models/player.interface';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rounds: string[] = ['TT', 'ET', 'EE', 'TTT', 'ETT', 'EET', 'EEE'];
  currentRoundIndex: number = 0;
  players: Player[] = [];

  constructor(public alertController: AlertController, public actionSheetController: ActionSheetController) { }

  async addPlayer(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Nombre del jugador',
      inputs: [
        {
          name: 'playerName',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (result) => {
            this.players.push({
              name: result.playerName,
              score: 0
            });
            this.orderPlayerByScore();
          }
        }
      ]
    });

    await alert.present();
  }

  async nextRound(): Promise<void> {
    const inputs: AlertInput[] = this.players.map((player: Player, playerIndex: number) => ({
      type: 'number',
      name: playerIndex.toString(),
      placeholder: player.name
    }));
    const alert = await this.alertController.create({
      header: 'Añadir puntuación',
      inputs,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (result) => {
            for (const playerIndex in result) {
              this.players[playerIndex].score += Number(result[playerIndex]);
            }
            this.orderPlayerByScore();
            this.currentRoundIndex++;
          }
        }
      ]
    });

    await alert.present();
  }

  async changePlayerName(playerIndex: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Cambiar nombre',
      inputs: [
        {
          name: 'playerName',
          type: 'text',
          value: this.players[playerIndex].name
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (result) => {
            this.players[playerIndex].name = result.playerName;
          }
        }
      ]
    });

    await alert.present();
  }

  async addScore(playerIndex: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Añadir puntuación',
      inputs: [
        {
          name: 'score',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (result) => {
            this.players[playerIndex].score += Number(result.score);
            this.orderPlayerByScore();
          }
        }
      ]
    });

    await alert.present();
  }

  async selectPlayer(playerIndex: number): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: this.players[playerIndex].name,
      buttons: [{
        text: 'Eliminar jugador',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.players.splice(playerIndex, 1);
        }
      }, {
        text: 'Cambiar nombre',
        icon: 'person',
        handler: () => {
          this.changePlayerName(playerIndex);
        }
      }, {
        text: 'Añadir puntuación',
        icon: 'add-circle-outline',
        handler: () => {
          this.addScore(playerIndex);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });

    await actionSheet.present();
  }

  orderPlayerByScore(): void {
    this.players.sort((playerA: Player, playerB: Player) => {
      if (playerA.score > playerB.score) {
        return 1;
      }
      if (playerA.score < playerB.score) {
        return -1;
      }
      return 0;
    });
  }

}
