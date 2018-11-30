import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import {ActivatedRoute, Router} from '@angular/router';
import { from } from 'rxjs';
import {ProductService } from '../product.service';
import {Location} from '@angular/common';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  editProduct:Product= new Product();
  findProduct: Product;
  oldIMG:String ="";
  selectedFile: File = null;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'image_product'});
  //id: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private route: Router,
    private _location: Location
   
  ) { }

  ngOnInit() {
    
  this.findProduct = new Product( this._activatedRoute.snapshot.params['id']);   
  this._productService.getProduct(this.findProduct)
    .subscribe(
      (product: Product )=>{
            this.editProduct =  product;
            this.oldIMG += "/assets/upload/"+ this.editProduct.image_product; 
        },
        (error)=>{
            this._location.back();
          });

          this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
          this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
              console.log('ImageUpload:uploaded:', item, status, response);
          };
      }

  onFileSelected(event){
    this.selectedFile = < File > event.target.files[0];

    if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.oldIMG = event.target.result;
            this.editProduct.image_product = this.selectedFile.name;
          }
          reader.readAsDataURL(event.target.files[0]);
      }

  }

  update(){
    this._productService.update(this.editProduct).subscribe(
      (data: Product)=>{
        alert("Productos almacenado");
        this.uploader.uploadAll();
        this.editProduct = new Product();
        this.route.navigate(["products",[]]);
       },
        (error)=>{ console.log(error); 
          
       });
    
  }

}
