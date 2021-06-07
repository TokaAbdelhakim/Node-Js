import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   apiUrl = 'https://jsonplaceholder.typicode.com/users'
  constructor(private _http:HttpClient) { }

  getSliders(){
    let sliders = [
      'assets/1.jpg','assets/2.jpg','assets/3.jpg'
    ]
    return sliders
  }
  getAbout(){
    let about = {
       title : 'About Section',
       image : 'assets/about.png',
       data : 'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    }
    return about
  }
  getApi():Observable<any>{
    return this._http.get(this.apiUrl)
  }
}
