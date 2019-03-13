import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService{
    constructor(public http : HttpClient){
    }

    // método findAll retornando uma lista categoriaDTO
    findAll() : Observable<CategoriaDTO[]>{

        // usando a crase abaixo, permite usar variaveis, sem a necessidade de contatenar - JavaScript Total
        //  a fiunção abaixo esta "tipada" retornando um List de CategoriaDTO
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}