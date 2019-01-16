import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConectionSettings } from './ConnectionSetting';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }
 
  submitReview(obj)
  {
    const url = ConectionSettings.Url+"/addReview";
    return this.http.post(url, obj);
  }

}
