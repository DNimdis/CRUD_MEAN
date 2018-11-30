import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';


import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[]=[ ];
  src: String="/assets/upload/";
  
  constructor(
     private _productService: ProductService
     ) { }

  ngOnInit() {
   
    this.getUsers();
  }

  getUsers(){
   this._productService.getProducts().subscribe(
      (product: Product[])=>{

        this.products = product;
        
      },
      (error)=>{

        console.log( error);        
        alert("Ocurrio un error");

      }
   );
  }


}
