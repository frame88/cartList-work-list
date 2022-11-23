/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Products } from '../models/IGetAll';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  infoProd;

  constructor(
    private http: HttpClient) { }

  ngOnInit() {
  }

  //OTTIENE INFO SU UN PRODOTTO
  info(id: number) {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.http.get<Products>(`${environment.API.backend}/api/ShoppingCart/${id}`, {headers} )
    .subscribe((result: Products) => {
      this.infoProd = result;
      console.log('info sul prodotto particolare: ', this.infoProd);
    });
  }

}
