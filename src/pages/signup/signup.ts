import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email:['j@gmail.com', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['86451105040', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Rua A',[Validators.required]],
        numero: ['20', [Validators.required]],
        complemento: ['',[]],
        bairro: ['Copacabana',[]],
        cep: ['21511490',[Validators.required]],
        telefone1: ['2121121',[Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]],
      });
  }
signupUser(){
  console.log("Enviou o Formulário");
}

ionViewDidLoad(){ // apos a tela carregar...
  this.estadoService.findAll()
  .subscribe(response =>  {
    this.estados = response;
    this.formGroup.controls.estadoId.setValue(this.estados[0].id);
    this.updateCidades();


  }, error => {});

}

updateCidades(){
  let estado_id = this.formGroup.value.estadoId;
  this.cidadeService.findAll(estado_id)
  .subscribe(response => {
    this.cidades = response;
    this.formGroup.controls.cidadeId.setValue(null);
  })
}

}
