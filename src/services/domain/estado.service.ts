import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EstadoService{
    constructor(public http : HttpClient){
    }

    // método findAll retornando uma lista categoriaDTO
    findAll() : Observable<EstadoDTO[]>{

        // usando a crase abaixo, permite usar variaveis, sem a necessidade de contatenar - JavaScript Total
        //  a fiunção abaixo esta "tipada" retornando um List de CategoriaDTO
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}