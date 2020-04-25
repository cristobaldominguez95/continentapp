import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player.interface';
import { PersistentData } from '../models/persistent-data.interface';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  rounds: string[] = ['TT', 'ET', 'EE', 'TTT', 'ETT', 'EET', 'EEE'];
  currentRoundIndex: number = 0;
  players: Player[] = [];

  constructor(private alertController: AlertController, private actionSheetController: ActionSheetController) { }

  ngOnInit(): void {
    Storage.get({ key: 'persistent-data' }).then((data) => {
      if (data.value) {
        const parsedData: PersistentData = JSON.parse(data.value);
        this.currentRoundIndex = parsedData.currentRoundIndex;
        this.players = parsedData.players;
      }
    }).catch((err) => {
      console.log('Cannot read from storage', err);
    });
  }

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
          handler: (input) => {
            this.players.push({
              name: input.playerName,
              score: 0
            });
            this.orderPlayerByScore();
            this.saveData();
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
          handler: (input) => {
            for (const playerIndex in input) {
              this.players[playerIndex].score += Number(input[playerIndex]);
            }
            this.orderPlayerByScore();
            this.currentRoundIndex++;
            this.saveData();
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
          handler: (input) => {
            this.players[playerIndex].name = input.playerName;
            this.saveData();
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
          handler: (input) => {
            this.players[playerIndex].score += Number(input.score);
            this.orderPlayerByScore();
            this.saveData();
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
          this.saveData();
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

  saveData(): void {
    const data: PersistentData = {
      currentRoundIndex: this.currentRoundIndex,
      players: this.players
    };
    Storage.set({
      key: 'persistent-data',
      value: JSON.stringify(data)
    });
  }

  newGame(): void {
    this.currentRoundIndex = 0;
    this.players = [];
    Storage.remove({ key: 'persistent-data' });
  }

}
