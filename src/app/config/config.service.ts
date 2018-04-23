import { Injectable, OnInit } from '@angular/core';
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
  
  config = new Config();
  
  loadConfig(): Observable<Config> { 
  
    this.messageService.add('ConfigService: fetched config');
 
    var retrievedConfig = localStorage.getItem('quiosco-config');

    if (retrievedConfig != null) {
          this.config = JSON.parse(retrievedConfig);
    } else {
          this.config.productKey=environment.defaultProductKey;
          this.config.serverURL=environment.defaultServerURL;
          this.config.updateTimer=environment.defaultUpdateTimer;
          this.config.lastUpdate=environment.defaultLastUpdate;
          localStorage.setItem('quiosco-config', JSON.stringify(this.config));
    }
    return of(this.config);
  }

  saveConfig(config: Config) {
    localStorage.setItem('quiosco-config', JSON.stringify(config));
  }

  getConfig() {
    return this.config;
  }

}