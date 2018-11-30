import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute , Router} from '@angular/router';
import { ProductService } from '../product.service'
import { Product} from '../product';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'image_product'});
  @Output() createNewUserEvent = new EventEmitter();
  
  newProduct = new Product();
  selectedFile: File = null;
  constructor( 
    private _productService: ProductService, private _activatedRoute: ActivatedRoute , private http: HttpClient, private route: Router ) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
    
  }

  onFileSelected(event){
    this.selectedFile = < File > event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.newProduct.image_product = this.selectedFile.name;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

   
  }

  onUpload(){
    
    const uploadData = new FormData();
    uploadData.append('image_product', this.selectedFile, this.selectedFile.name);
    uploadData.append('Content-Type', 'multipart/form-data');
    this.http.post('/assets/upload/', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); 
      });

  }

  create( ){
    
    this._productService.create(this.newProduct).subscribe(
      (data: Product)=>{
        alert("Productos almacenado");
        this.uploader.uploadAll();
        this.newProduct = new Product();
        this.route.navigate(["products",[]]);
       },
        (error)=>{ console.log(error); 
          
       });
  }

}
