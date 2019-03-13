import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.services';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService : CategoriaService) {  }

  ionViewDidLoad() {
    // isto é uma chamada assincrona, por isso, precisa programar uma função para executar a resposta da chamada
    // isso é feito pelo subscribe()
    // neste exemplo usamos uma função anônima, programando a função dentro da propria função subscribe()
    this.categoriaService.findAll()
    .subscribe(response => {
        console.log(response)

    },
    error => {
        console.log(error);
    });

  }

}
