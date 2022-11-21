import { IModProd } from './../models/IModProd';
/* eslint-disable object-shorthand */
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
  infoProd;


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
    console.log(form.value);
    this.add(form);
  }

  add(form: NgForm) {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': `Bearer ${token}`
    });
    this.http.post<RespINewProd>(`${environment.API.backend}/api/ShoppingCart`, form.value, {headers})
    .subscribe(result => {
      this.getAll();
      form.reset();
    });
  }

  //ELIMINA IL PRODOTTO PARTICOLARE

  deleteHandler(id: number){
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': `Bearer ${token}`
    });
    this.http.delete(`${environment.API.backend}/api/ShoppingCart/${id}`, {headers})
    .subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      console.log(this.products);
    });
  }


  //MODIFICA IL PRODOTTO PARTICOLARE
  edit(form: NgForm, id: number) {
    console.log(form);
    const bodyy: IModProd =
    {
      id: id,
      category: form.value.category,
      productName: form.value.productName,
      quantity: form.value.quantity,
      unitCost: form.value.unitCost,
      orderDate: form.value.orderDate
    };
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': `Bearer ${token}`
    });
    this.http.put(`${environment.API.backend}/api/ShoppingCart`, bodyy, {headers} )
    .subscribe(() => {
      console.log(this.products);
    });
  }

  //OTTIENE INFO SU UN PRODOTTO
  info(id: number) {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': `Bearer ${token}`
    });
    this.http.get<Products>(`${environment.API.backend}/api/ShoppingCart/${id}`, {headers} )
    .subscribe((result: Products) => {
      this.infoProd = result;
      console.log('info sul prodotto particolare: ', this.infoProd);
    });
  }
}

