import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        return next.handle(req)
        .catch((error,caught) => {
            let erroObj = error;
            // verifica se veio o "erro" padronizado da API
            if(erroObj.erro){
                erroObj = erroObj.erro;
            }

            // caso não tenha o campo status, então voltou no formado <> Json
            if(!erroObj.status){
                erroObj = JSON.parse(erroObj);

            }

            console.log("Erro detectado pelo Interceptor :");
            console.log(erroObj);


            return Observable.throw(erroObj);
        }) as any;

    }

}
    export const ErrorInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,
    };
