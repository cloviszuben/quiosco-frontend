import { Injectable } from '@angular/core';SVGTitleElement

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Playlist } from './playlist';
import { Media } from './media';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import * as FileSaver from 'file-saver'; 
import { ResponseContentType } from '@angular/http';

@Injectable()
export class PlaylistService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
   
   
  getSavedPlaylist(): Observable<HttpResponse<Playlist>> { 
  
    this.messageService.add('PlaylistService: fetched medias');

    return this.http.get<Playlist>('assets/playlist.json',{observe:'response'})
        .pipe(
          catchError(this.handleError)
        );
  };
 
  getRemotePlaylist(serverURL: string): Observable<HttpResponse<Playlist>> { 
  
    return this.http.get<Playlist>(serverURL)
        .pipe(
          catchError(this.handleError) 
        );
  };
 

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

 
  downloadFile(filename: string) { 
  
    this.messageService.add('DownloadFile: ' + filename);

    return this.http.get(filename, {responseType: 'blob'})
    .pipe (
      tap (
          data => console.info(data),
          error => console.error(error)
      )
    );
/*
    return this.http.get<Playlist>('http://localhost:8080/manager/images/tomcat.gif',{observe:'response'})
        .pipe(
          catchError(this.handleError)
        );
        */
  };
 
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}