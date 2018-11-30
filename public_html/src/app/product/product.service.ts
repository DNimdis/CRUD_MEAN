import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Product } from './product';
const ENDPOIN = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(
    private _http:HttpClient
  ) { }

  getProducts(){
    return this._http.get('http://localhost:3000/api/product');
  }
  
  getProduct( product: Product){
    const  headers = new HttpHeaders( {'Content-type' : 'application/json'} );
    return this._http.post('/api/product/'+ product._id,{headers: headers});
  } 

  create(product: Product){
    
    const  headers = new HttpHeaders( {'Content-type' : 'application/json'} );
          
    return this._http.post('/api/product' , product,{headers: headers});
  }

  update(product: Product){
    const  headers = new HttpHeaders( {'Content-type' : 'application/json'} );
    return this._http.put('/api/product/'+ product._id , product , {headers: headers});
  }

  distroy( product: Product){
    
    return this._http.delete('/api/Product/'+product._id );
  }

 

}
