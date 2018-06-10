import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { Category, Product } from './app.models';
import { CartDataService } from './pages/cart/cart-data.service'
import {User} from './models/User.model';
import {environment} from '../environments/environment';

export class Data {
    constructor(public categories: Category[],
                public compareList: Product[],
                public wishList: Product[],
                public cartList: Product[],
                public totalPrice: number) { }
}

@Injectable()
export class AppService {
    public Data = new Data(
        [], // categories
        [], // compareList
        [],  // wishList
        [],  // cartList
        null //totalPrice
    )

    public cartMap = new Map();
    public cartTotalPrice = 0;
    ///temp
    public logedIn=false;
    public user: User;
    public lang: string;
    
    public url = "assets/data/";

    public color ='#f56d13' ;
    constructor(public http:HttpClient, public snackBar: MatSnackBar,                
                private cartDataService:CartDataService) 
    { 
        this.readCartFromLocalStorage();
        this.color = localStorage.getItem('color')?localStorage.getItem('color'):'#f56d13';  
    }
    
    public getCategories(): Observable<Category[]>{
        return this.http.get<Category[]>(this.url + 'categories.json');
    }
   
    public getProducts(type): Observable<Product[]>{        
        return this.http.get<Product[]>(this.url + type + '-products.json');
    }

    public getProductById(id): Observable<Product>{
        return this.http.get<Product>(this.url + 'product-' + id + '.json');
    }

    public getBanners(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'banners.json');
    }

    public addToCompare(product:Product){
        let message, status;
        if(this.Data.compareList.filter(item=>item.id == product.id)[0]){
            message = 'The product ' + product.name + ' already added to comparison list.'; 
            status = 'error';     
        }
        else{
            this.Data.compareList.push(product);
            message = 'The product ' + product.name + ' has been added to comparison list.'; 
            status = 'success';  
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public addToWishList(product:Product){
        let message, status;
        if(this.Data.wishList.filter(item=>item.id == product.id)[0]){
            message = 'The product ' + product.name + ' already added to wish list.'; 
            status = 'error';     
        }
        else{
            this.Data.wishList.push(product);
            message = 'The product ' + product.name + ' has been added to wish list.'; 
            status = 'success';  
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }   
        
    public addToCart(product:Product){

        if(this.cartMap.has(product.id))
            {
                this.cartMap.set(product.id , 
                        { count:(this.cartMap.get(product.id).count)+1,product:product });
                console.log((this.cartMap.get(product.id).count)+1)
                }
        else
                this.cartMap.set(product.id , { count:1,product:product });    


        this.cartTotalPrice=0;             
         this.cartMap.forEach(value=>{
            this.cartTotalPrice += (value.count * value.product.price);
         })    
         this.writeCartToLocalStoarge();
            let message = 'The product ' + product.name + ' has been added to cart.'; 
            let status = 'success';  
            this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
            this.cartDataService.changeCart(this.cartMap);                   
        }

    public removeFromCart(product) {

        if(this.cartMap.has(product.id)){
            let tempCount = this.cartMap.get(product.id).count;
            if(--tempCount)
                this.cartMap.set(product.id ,{ count:tempCount,product:product });
            else
                this.cartMap.delete(product.id);
                
            this.cartTotalPrice=0;             
            this.cartMap.forEach(value=>{
                this.cartTotalPrice += (value.count * value.product.price);
            });                

            this.writeCartToLocalStoarge();
        }
        this.cartDataService.changeCart(this.cartMap);                   

      }
    
    public refreshCart(){
        this.cartTotalPrice=0;             
        this.cartMap.forEach(value=>{
            this.cartTotalPrice += (value.count * value.product.price);
        });
        this.writeCartToLocalStoarge(); 
        this.cartDataService.changeCart(this.cartMap);                   
    }  

    private writeCartToLocalStoarge(){
        let market = localStorage.getItem('market');
        let tempCart = JSON.parse(localStorage.getItem('cart'))||[];

        tempCart[market] = {totalPrice:this.cartTotalPrice,map: Array.from(this.cartMap.entries())}; 
        localStorage.setItem('cart' , JSON.stringify(tempCart)) 
      }


    public readCartFromLocalStorage(){
        let market = localStorage.getItem('market');
        let tempCart = JSON.parse(localStorage.getItem('cart'));
        if(tempCart && tempCart[market]){
            this.cartMap = new Map(tempCart[market].map);
            this.cartTotalPrice = tempCart[market].totalPrice; 
            this.cartDataService.changeCart(this.cartMap);                   
        }
      }

    // public getArrayFromMapCart(){
    //     let products = [];
    //     this.cartMap.forEach(entry=>{
    //         products.push(entry);
    //     })
    //     return products;
    // }  

    public clearCart(){
        this.cartMap.clear();
        this.cartTotalPrice=0;
        this.writeCartToLocalStoarge();
    }   


    getUser(id): Observable<User> {
        let params = new HttpParams();
        params = params.append('userId', id);
        return this.http.get<User>(environment.API_ENDPOINT+'get-user', { params: params});
    }

} 