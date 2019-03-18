import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public storage: StorageService,
        public alertCtrl: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {
                let erroObj = error;
                // verifica se veio o "erro" padronizado da API
                if (erroObj.erro) {
                    erroObj = erroObj.erro;
                }

                // caso não tenha o campo status, então voltou no formado <> Json
                if (!erroObj.status) {
                    erroObj = JSON.parse(erroObj);

                }

                console.log("Erro detectado pelo Interceptor :");
                console.log(erroObj);
                switch (erroObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    default:
                        this.handleDefaultError(erroObj);
                        break;

                }


                return Observable.throw(erroObj);
            }) as any;

    }

    handle403() {
        
        this.storage.setLocalUser(null);

    }

    handleDefaultError(erroObj){
        let alert = this.alertCtrl.create({
            title: 'Erro ' + erroObj.status + ': ' + erroObj.error,
            message: erroObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]


        });
        alert.present();

    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha na autenticação',
            message: 'Email ou Senha Inválidos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]


        });
        alert.present();

    }

}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
