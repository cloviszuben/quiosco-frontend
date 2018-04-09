import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../message.service';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Config } from '../config';
import { environment } from '../../environments/environment';


@Injectable()
export class ConfigService {

  constructor(private messageService: MessageService) { }
  
  getConfig(): Observable<Config> { 
  
    this.messageService.add('ConfigService: fetched config');

    var config = new Config();
  
    var retrievedConfig = localStorage.getItem('quiosco-config');

    if (retrievedConfig != null) {
          config = JSON.parse(retrievedConfig);
    } else {
          config.productKey=environment.defaultProductKey;
          config.serverURL=environment.defaultServerURL;
          localStorage.setItem('quiosco-config', JSON.stringify(config));
    }
    return of(config);
  }

  saveConfig(config: Config) {
    localStorage.setItem('quiosco-config', JSON.stringify(config));
  }
}