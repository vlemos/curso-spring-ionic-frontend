import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();
    
    constructor(public http :  HttpClient,
        public storage : StorageService){

    }

    authenticate(creds : CredenciaisDTO){
       return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe : 'response', // pega a resposta.. acesso ao hearder
                responseType: 'text' //evita o erro de parse no Json de um corpo vazio
            }
        )
    }


    refreshToken(){
        return this.http.post(
             `${API_CONFIG.baseUrl}/auth/refresh_token`,
             {},
             {
                 observe : 'response', // pega a resposta.. acesso ao hearder
                 responseType: 'text' //evita o erro de parse no Json de um corpo vazio
             }
         )
     }
 


    successfullLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7); // remove a palavra bearer do token recebido
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub // pega o email do token
        }
        this.storage.setLocalUser(user);

    }

    logout(){
        this.storage.setLocalUser(null);
    }


}