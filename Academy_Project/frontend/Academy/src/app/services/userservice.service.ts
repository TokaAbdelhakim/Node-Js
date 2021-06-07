import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Userdata} from 'src/app/interfaces/userdata'

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  commonUrl = 'http://localhost:3000/'
  constructor(private _http : HttpClient) { }

  registerUser (userObj : Userdata):Observable<any>{
    return this._http.post(`${this.commonUrl}createAccount`,userObj)
  }
}
