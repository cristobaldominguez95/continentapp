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
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (result) => {
            this.players.push({
              name: result.playerName,
              points: 0
            });
            this.orderPlayerByPoints();
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
              this.players[playerIndex].points += Number(result[playerIndex]);
            }
            this.orderPlayerByPoints();
            this.currentRoundIndex++;
          }
        }
      ]
    });

    await alert.present();
  }

  async selectPlayer(player: Player, playerIndex: number): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: player.name,
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
          console.log('Share clicked');
        }
      }, {
        text: 'Añadir puntuación',
        icon: 'add-circle-outline',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });

    await actionSheet.present();
  }

  orderPlayerByPoints(): void {
    this.players.sort((playerA: Player, playerB: Player) => {
      if (playerA.points > playerB.points) {
        return 1;
      }
      if (playerA.points < playerB.points) {
        return -1;
      }
      return 0;
    });
  }

}
