import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService{
    constructor(public storage: StorageService){

    }

    createOrClearCart(): Cart{
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
        
    }
    getCart(): Cart{
        let cart: Cart = this.storage.getCart();
        if (cart == null ){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); // encontra a posição do produto dentro da lista caso esta exista (produto repetido)
        if(position == -1 ) {// produto nao existia
            cart.items.push({quantidade: 1, produto: produto}); // inclui o produto na lista
        }
        this.storage.setCart(cart); // atualiza o carrinho no storage
        return cart;

    }
    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); // encontra a posição do produto dentro da lista caso esta exista (produto repetido)
        if(position != -1 ) {// produto encontrado
            cart.items.splice(position,1); // remove a posição indicada
        }
        this.storage.setCart(cart); // atualiza o carrinho no storage
        return cart;

    }
    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); // encontra a posição do produto dentro da lista caso esta exista (produto repetido)
        if(position != -1 ) {// produto encontrado
            cart.items[position].quantidade++; 
        }
        this.storage.setCart(cart); // atualiza o carrinho no storage
        return cart;

    }
    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); // encontra a posição do produto dentro da lista caso esta exista (produto repetido)
        if(position != -1 ) {// produto encontrado
            cart.items[position].quantidade--; 
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart); // atualiza o carrinho no storage
        return cart;

    }
    total() : number{
        let cart = this.getCart();
        let sum = 0;
        for(var i=0; i<cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }
}