import { Component } from '@angular/core';
import { NavController, IonicPage, Menu } from 'ionic-angular';
import { CategoriasPage } from '../categorias/categorias';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }


  //usando Ciclo de vida da pagina para desabilitar ou habilitar o menu
ionViewWillEnter(){
  this.menu.swipeEnable(false);
}

ionViewDidLeave(){
  this.menu.swipeEnable(true);

}


}
