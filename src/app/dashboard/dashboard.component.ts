import { Component, OnInit, ViewChild } from '@angular/core';

import { PlaylistService } from '../playlist.service';
import { Playlist }        from '../playlist';
import { Media }        from '../media';

import {DataSource} from '@angular/cdk/collections';

import {MatTableModule} from "@angular/material/table"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {

  displayedColumns = ['id', 'ordem', 'nome'];
  dataSource = <Media[]> [];    
  
  playlist : Playlist;
  error: any;

  headers: string[];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.getPlaylist(); 
  }

  getPlaylist(): void {
    
    this.playlistService.getPlaylist()
          .subscribe(resp => {
          
            const keys = resp.headers.keys();
            this.headers = keys.map(key => '${key}: ${resp.headers.get(key)}');
            this.playlist = { ... resp.body};
            
            console.info( this.playlist);
            
            this.dataSource = this.playlist.medias;
          },
          error => this.error = error          
        );

  }
}


