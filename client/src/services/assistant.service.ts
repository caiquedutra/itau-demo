import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from '../environments/environment'
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  assistantConversation(objConversation): Observable<any> {
    return this.http.post<any>(this.url + '/assistant/', objConversation)
      .pipe(
        map(response => {
          return response
        })
      )
  }

}
