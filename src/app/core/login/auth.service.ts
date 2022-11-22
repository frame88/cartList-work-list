/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/*
import { IUserResponse } from 'src/app/models/IUserResponse';
import { ToastController } from '@ionic/angular';
import { IUser } from 'src/app/models/IUser';
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Subscription, interval } from 'rxjs';
import { NavController } from '@ionic/angular';

import { IAuth } from 'src/app/models/IAuth';
import { IToken } from 'src/app/models/IToken';
import { IUserInfo } from 'src/app/models/IUserInfo';

import { HttpInterceptor } from '@angular/common/http';
import { IRefresh } from 'src/app/models/IRefresh';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


// Variabili User
  data: IAuth | undefined ;
  token: string;
  userData: IUserInfo = {
    token: '',
    expDate: null,
    username: '',
    nome: '',
    cognome: '',
    email:''
  };
  expirationDate: Date;
  user = '';

// Variabili Errore
  error = false;
  errorMessage = '';

  subscriptions: Subscription[] = [];

  now: number;
  date$ = interval(1000).pipe(
    map(() => new Date())).subscribe(
      (r) => {
        this.now = r.getTime() - 7500;  // get Date - 7500 = orario attuale
      }
      );

  tok;
  statusInterval;

  constructor(
    private http: HttpClient, //servizio per comunicare backend con frontend
    private router: Router, //servizio per navigare tra le diverse view di angular
    private navCtrl: NavController //servizio analogo a quello sopra ma di ionic
    ){}

  login({user, pass }: {user: string; pass: string}) {

    const user64 = btoa(user);
    const pass64 = btoa(pass);

    this.data = {
      username: user64,
      password: pass64,
    };

    // Autenticazione e creazione del token
    this.http.post<IToken>(`${environment.API.backend}/api/Auth/Login`, this.data)
    .subscribe((res: IToken ) => {

      if(res.success){

        this.error = false;

        this.token = res.data.token;

        this.expirationDate = res.data.expirationDate;

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${res.data.token}`
        });

        this.tok = res.data.token;

        localStorage.setItem('token', JSON.stringify(res.data));

        this.router.navigateByUrl('/nuovapagina', {replaceUrl: true});

      }
      else if(res.errorMessage){
        this.error = true;
        this.errorMessage = res.errorMessage;
      }
    });
  }
  isLogged(){
    if(localStorage.getItem('token')){

    const boh = JSON.parse(localStorage.getItem('token')).expirationDate; //orario in cui verrò buttato fuori
    //boh è la data di scadenza e new Date la data attuale
    return !!(new Date(boh) < new Date() === false);
    }
  }

  //esci
  logout() {

    this.subscriptions.forEach((sub) =>sub.unsubscribe());
    this.subscriptions = [];
    clearInterval(this.statusInterval);

    this.data = null;
    this.user = '';
    localStorage.clear();

    this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'forward' });
  }

  // refreshToken(token: string, refreshToken: string) {

  //   this.http.post<IRefresh>(`${environment.API.backend}/api/Auth/RefreshToken`, {token, refreshToken})
  //   .subscribe((res: IRefresh) => {

  //   }
  //   )

//}
}


