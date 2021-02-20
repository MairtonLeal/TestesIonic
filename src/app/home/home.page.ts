import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  screen: any;
  state: boolean = false;
  constructor(private datePicker: DatePicker, private screenshot: Screenshot, public alertController: AlertController) { }

  mostrarDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => alert(date),

      err => console.log('Error occurred while getting date: ', err)
    );
  }

  reset() {
    var self = this;
    setTimeout(function () {
      self.state = false;
    }, 1000);
  }

  screenShot() {
    this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(res => {
      this.screen = res.filePath;
      this.state = true;
      this.reset();
    });
  }
  screenShotURI() {
    this.screenshot.URI(80).then(res => {
      this.screen = res.URI;
      this.state = true;
      this.reset();
    });
  }


  async addCustomTask() {
    const alert = await this.alertController.create({
      header: 'Add custom task',
      mode: 'md',
      inputs: [

        {
          name: 'data1',
          placeholder: 'Data, e Hora',
          type: 'datetime-local',
          label: 'clique para data',

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            console.log(alertData.data1);
          }
        }
      ]
    });
    await alert.present();
  };

}
