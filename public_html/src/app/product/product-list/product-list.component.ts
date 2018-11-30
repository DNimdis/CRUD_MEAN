import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[ ];
  src: String="/assets/upload/";
  constructor(
   private  _productService: ProductService
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

  destroy(product: Product){

    if( confirm("Estas seguro de eliminar este producto?")){

      this._productService.distroy(product).subscribe(
        (product: Product[])=>{
                    
        },
        (error)=>{
          
          console.log( error);        
          alert("Ocurrio un error");
          
        }
        );
        this.getUsers();
      }
  }

}
