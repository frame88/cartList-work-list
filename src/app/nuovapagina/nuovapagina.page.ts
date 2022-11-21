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
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': `Bearer ${token}`
    });
    this.http.post<RespINewProd>(`${environment.API.backend}/api/ShoppingCart`, form.value, {headers})
    .subscribe(result => {
      // this.products.push(result.data);
      // console.log(result.data);
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
  edit(id: number) {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': `Bearer ${token}`
    });
    this.http.put(`${environment.API.backend}/api/ShoppingCart/${id}`, {headers})
    .subscribe(() => {
    });
  }


  //OTTIENE UN PRODOTTO
  //  .............
}

