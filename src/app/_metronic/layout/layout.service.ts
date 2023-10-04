import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient,) { }

  
  public getDestination(){

    let myData = this.http.get<any>("http://localhost:5000/get_destinations");
    return myData ;
  }


  public get_offers(){

    let myData = this.http.get<any>("http://localhost:5000/get_offers");
    return myData;
  }
  get_all_properties_details_b2c(currency: any) {
     
    return this.http.get(`http://localhost:5000/get_all_properties_details_b2c?currency=${currency}`)
   
  }
  


  }

