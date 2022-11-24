/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IModProd } from '../models/IModProd';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../models/IGetAll';
import { Router } from '@angular/router';
import { IGetAll } from '../models/IGetAll';
import { getLocaleCurrencyCode } from '@angular/common';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  products: Products[] = [];
  acca;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
  }

  //MODIFICA IL PRODOTTO PARTICOLARE
  edit(form: NgForm, id: number) {
    console.log(form);
    const bodyy: IModProd =
    {
      id: form.value.id,
      category: form.value.category,
      productName: form.value.productName,
      quantity: form.value.quantity,
      unitCost: form.value.unitCost,
      orderDate: form.value.orderDate
    };
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.http.put(`${environment.API.backend}/api/ShoppingCart`, bodyy, {headers} )
    .subscribe(() => {
      console.log(this.products);
    });

    this.router.navigateByUrl('nuovapagina');

  }
}
