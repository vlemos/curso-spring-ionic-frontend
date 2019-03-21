import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/enderecos.dto';



@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua A",
        numero: "10",
        complemento: "apto 204",
        bairro: "Figueira",
        cep: "20493-415",
        cidade: {
          id: "1",
          nome: "uberlandia",
          estado: {
            id: "1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua B",
        numero: "20",
        complemento: "casa 1",
        bairro: "Centro",
        cep: "21511-490",
        cidade: {
          id: "3",
          nome: "Sao Paulo",
          estado: {
            id: "2",
            nome: "Sao Paulo"
          }
        }
        
      }
    ];
  }

}
