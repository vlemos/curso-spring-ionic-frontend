import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CidadeService{
    constructor(public http : HttpClient){
    }

    // método findAll retornando uma lista categoriaDTO
    findAll(estado_id : string) : Observable<CidadeDTO[]>{

        // usando a crase abaixo, permite usar variaveis, sem a necessidade de contatenar - JavaScript Total
        //  a fiunção abaixo esta "tipada" retornando um List de CategoriaDTO
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}