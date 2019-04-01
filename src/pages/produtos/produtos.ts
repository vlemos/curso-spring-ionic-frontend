import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.services';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();


    this.produtoService.findByCategoria(categoria_id).subscribe
    (response => {
      this.items = response['content']; // pega somente o atributo content dentro da resposta.
      loader.dismiss();
      this.loadImageUrls();
    },
    error=> {
      loader.dismiss();
    });
  }

  loadImageUrls(){
    for(var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
      },
      error=> {});

    }

    
  }
  showDetail(produto_id: string){
   this.navCtrl.push('ProdutoDetailPage', {produto_id:produto_id});  
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;

  }

  doRefresh(ionRefresh) {
    this.loadData();

    setTimeout(() => {
    
      ionRefresh.complete();
    }, 2000);
  }

}
