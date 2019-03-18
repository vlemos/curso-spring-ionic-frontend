import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public storage: StorageService){

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
                    case 403:
                        this.handle403();
                        break;

                }


                return Observable.throw(erroObj);
            }) as any;

    }

    handle403() {
        this.storage.setLocalUser(null);
        
    }

}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
