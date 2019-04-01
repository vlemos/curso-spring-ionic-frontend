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

  items: ProdutoDTO[] = []; //inicinado a lista vazia;
  page : number = 0;

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


    this.produtoService.findByCategoria(categoria_id, this.page, 10).subscribe
    (response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']); // pega somente o atributo content dentro da resposta., concatenando a lista anterior
      let end = this.items.length - 1;
      loader.dismiss();
      this.loadImageUrls(start,end);
    },
    error=> {
      loader.dismiss();
    });
  }

  loadImageUrls(start: number, end: number){
    for(var i=start; i<=end; i++){
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
    this.page = 0;
    this.items = []; // zera a lista para carregar ...
    this.loadData();

    setTimeout(() => {
    
      ionRefresh.complete();
    }, 2000);
  }

  doInfinite(ionInfinite){
    this.page++;
    this.loadData();

    setTimeout(() => {
      
      ionInfinite.complete();
     
    }, 1000);

  }

}
