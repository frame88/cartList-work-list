/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RespINewProd } from '../models/INewProd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

    save(form: NgForm) {
    console.log(form.value);
    this.add(form);
    this.router.navigateByUrl('nuovapagina');
  }

  add(form: NgForm) {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.http.post<RespINewProd>(`${environment.API.backend}/api/ShoppingCart`, form.value, {headers})
    .subscribe(result => {
      //this.getAll();
      form.reset();
    });
  }


}
