/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAddProdakt } from '../models/IAddProdakt';

import { IGetAll, Products } from '../models/IGetAll';
import { INewProd, RespINewProd } from '../models/INewProd';
import { NgForm } from '@angular/forms';
import { AuthService } from '../core/login/auth.service';

@Component({
  selector: 'app-nuovapagina',
  templateUrl: './nuovapagina.page.html',
  styleUrls: ['./nuovapagina.page.scss'],
})
export class NuovapaginaPage implements OnInit {
  products: Products[] = [];
  product: INewProd[] = [];

  constructor(
    private http: HttpClient,
    private ciao: AuthService
     ) {
  this.getAll();
  }

  ngOnInit() {
  }

  //STAMPA TUTTI I PRODOTTI
  getAll() {

    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': `Bearer ${token}`
    });


    console.log(this.ciao.tok);

    this.http.get<IGetAll>(`${environment.API.backend}/api/ShoppingCart`, {headers})
    .subscribe(result => this.products = result.data);
  }

  save(form: NgForm) {
    //const request = [];
    // request.push(form.value, Date());
    // console.log(request);
    console.log(form.value);
    this.add(form);
  }

  add(form: NgForm) {
    this.http.post<RespINewProd>(`${environment.API.backend}/api/ShoppingCart`, form.value)
    .subscribe(result => {
      this.products.push(result.data);
      console.log(result.data);
      form.reset();
    });
  }

  //ELIMINA IL PRODOTTO PARTICOLARE
  /*
  deleteHandler(product: INewProd){
    this.http.delete(`${environment.API.backend}/api/ShoppingCart/${product.id}`)
    .subscribe(() => {});
  }
  */

  //MODIFICA IL PRODOTTO PARTICOLARE
  /*
  edit(form: NgForm) {
    this.http.put(`${environment.API.backend}/api/ShoppingCart/${product.id}`,)
    .subscribe(() => {});
  }
  */

  //OTTIENE UN PRODOTTO
  //  .............
}

