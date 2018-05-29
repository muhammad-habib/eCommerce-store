import { Component, OnInit  } from '@angular/core';
import { Data, AppService } from '../../app.service';
import { CartServiceService } from'./cart-service.service'
import { element } from 'protractor';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartServiceService]
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  poroducts=[];
  productsIds=[];
  constructor(public appService:AppService,public cartServiceService:CartServiceService,
              ) {

    appService.cartMap.forEach(element => {
        this.productsIds.push(element.product.id);
     }); 
   }

   ngAfterViewInit(){
     
   }
  ngOnInit() {
    this.cartServiceService.getProducts(Array.from(this.appService.cartMap.keys()))
    .subscribe(
          res=>{
            this.poroducts = res['data'];
            this.poroducts.forEach(product=>{
              let temp = this.appService.cartMap.get(product.id);
              if(temp){
                temp.product.price = product.price;
                this.appService.cartMap.set(product.id,temp);              
              }
            });
            this.appService.refreshCart();
          },
          err=>{      

          }

        );
  }


  public remove(product) {
    this.appService.removeFromCart(product);
  }

  public clear(){
    this.appService.clearCart();
  } 

}
