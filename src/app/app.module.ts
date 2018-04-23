import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
//import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { ConfigComponent }      from './config/config.component';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';

import { AppRoutingModule }     from './app-routing.module';

import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatTableModule, MatHeaderRow, MatRow, MatHeaderRowDef} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatIconModule} from '@angular/material/icon';
import { PlaylistService } from './playlist.service';
import { ConfigService } from './config/config.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfigComponent,
  //  HeroDetailComponent,
    MessagesComponent
  ],
  providers: [ PlaylistService, ConfigService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }