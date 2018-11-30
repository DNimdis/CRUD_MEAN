import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  Routes, RouterModule} from '@angular/router';
// tenemos que registrar nuestro servicio
import { ProductService} from './product/product.service';
// tenemos  que importar nuestro proveedor de http
import { HttpClientModule } from '@angular/common/http';

// importamos ngform para formularios 
import {FormsModule} from '@angular/forms';

import { ProductComponent } from './product/product.component';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { FileSelectDirective } from 'ng2-file-upload';


const routes: Routes =[
  {path:'', component: ProductComponent,pathMatch: 'full'},
  {path:'product', component: ProductNewComponent},
  { path: 'product/:id', component: ProductEditComponent},
  { path: 'products', component: ProductListComponent},
  {path: 'product/ver/:id', component: ProductDetailComponent},
  { path: '**', component: ProductComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductNewComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductDetailComponent,
    FileSelectDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [ ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
