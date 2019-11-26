import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { contentThng } from '../interfaces/thing.interface';
import Thing from '../interfaces/thing.interface';


@Injectable({
  providedIn: 'root'
})
export class FordoService {

  private UrlGlobal = 'http://10.2.47.10:5000';

  constructor(private http:HttpClient) { }

  public PostThing(thing){
    let url = `${this.UrlGlobal}/v1/things`;
    return this.http.post(url,thing);
  }

  public getThing():Observable<Object>{
    let url = `${this.UrlGlobal}/v1/things`;
    return this.http.get(url);
  }

  public putThing(thing:contentThng){

    let url = `${this.UrlGlobal}/v1/things/${thing._id}`;
    return this.http.put(url, thing);
  }

  public DeleteThing(thingId){
    let url = `${this.UrlGlobal}/v1/things/${thingId}`;
    return this.http.delete(url);
  }
}
