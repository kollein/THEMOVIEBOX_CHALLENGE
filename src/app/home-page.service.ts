import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
 
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HomePageService {
  
  private dataUrl = 'https://api.themoviedb.org/4/list/1?api_key=a7b3c9975791294647265c71224a88ad';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
 
  getData (pageId): Observable<any> {
    const url = this.dataUrl;
    let data = this.http.get(url);
    return data.pipe(
      tap(_ =>this.log(`fetched data`)),
      catchError(this.handleError<any>(`error while get data`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HomePageService: ' + message);
  }
}