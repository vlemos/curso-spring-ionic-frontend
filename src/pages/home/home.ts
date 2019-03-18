import { Component } from '@angular/core';
import { NavController, IonicPage, Menu } from 'ionic-angular';
import { CategoriasPage } from '../categorias/categorias';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

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

  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth : AuthService) {

  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe( response => {
      this.auth.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');

    }, 
    error => {})
    
    
  }


  //usando Ciclo de vida da pagina para desabilitar ou habilitar o menu
ionViewWillEnter(){
  this.menu.swipeEnable(false);
}

ionViewDidLeave(){
  this.menu.swipeEnable(true);

}

ionViewDidEnter(){ //chama o refreshtoken caso o usuario ja se autenticou previamente. 
  this.auth.refreshToken()
  .subscribe( response => {
    this.auth.successfullLogin(response.headers.get('Authorization'));
    this.navCtrl.setRoot('CategoriasPage');

  }, 
  error => {})
}


}
