import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";

@Injectable()
export class AuthService{

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

    successfullLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7); // remove a palavra bearer do token recebido
        let user : LocalUser = {
            token: tok
        }
        this.storage.setLocalUser(user);

    }

    logout(){
        this.storage.setLocalUser(null);
    }


}