import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { variable } from '@angular/compiler/src/output/output_ast';

import { ConfigService }   from './config/config.service';
import { Config }          from './config';
import { PlaylistService } from './playlist.service';
import { Playlist }        from './playlist';
import { Media }           from './media';
//import { saveAs }          from "file-saver";

import * as fs from "fs-extra";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  title = 'QUIOSCO';
  
  config: Config;
  playlist: Playlist;
  lastPlaylist: Playlist;
 
  mediaFile: Blob;

  //dataSource = <Media[]> [];    
  headers: string[];
  error: any;
  
  constructor(private playlistService: PlaylistService, private configService: ConfigService) {  }
  
  ngOnInit() {
    
    // Obtem a Playlist salva em disco para mostrar a versão 
    this.playlistService.getSavedPlaylist().subscribe(resp => {this.playlist = { ... resp.body};});

    // Obtem a Configuração
    this.configService.loadConfig().subscribe((config) => this.config = config);

    console.log("Configuração: updateTimer[" + this.config.updateTimer + '], serverURL[' + this.config.serverURL + ']');
                 
    var that = this;
    setTimeout(function () { that.playlistUpdate(); }, this.config.updateTimer * 30000);   

  }

  playlistUpdate() {
    
    if (this.config.updateTimer > 0) {
    
      console.log("Verificando atualizações da playlist em [" + this.config.serverURL + "]!");
      
      this.getRemotePlaylist(this.config.serverURL);

      var that = this;
      setTimeout(function () { that.playlistUpdate(); }, this.config.updateTimer * 60000);
    }
  } 

  getRemotePlaylist(serveURL: string): void {
    

    this.playlistService.downloadFile('http://localhost:4200/manager/images/tomcat.gif')
         .subscribe(resp => {           
               this.mediaFile = resp;
               var blob = new Blob([resp], {type: "application/octet-stream"});
                             
    //saveAs(blob, '/testeBlob.jpg',false);
      
    /*
var fileContent = "hello";

fs.wwriteFile("sample2.txt", fileContent, (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
*/
               
         }
        );

    /*


    this.playlistService.getRemotePlaylist(serveURL)
          .subscribe(resp => {
          
            const keys = resp.headers.keys();
            this.headers = keys.map(key => '${key}: ${resp.headers.get(key)}');
            this.playlist = { ... resp.body};
            
            console.info(this.playlist);
            
            // Verifica se houve atualização, para ativar o Download das medias.
            if (this.lastPlaylist == null || this.playlist.version != this.lastPlaylist.version) {
            
              // Executa o script de atualização
              console.info("Executando Download da Playlist.");

              //this.playlistService.downloadFile('http://localhost:8080/manager/images/tomcat.gif');

              // Salvar Data de Atualização
           
              this.config.lastUpdate = new Date().toLocaleString();
              this.configService.saveConfig(this.config);


              this.lastPlaylist = this.playlist;
            }
            

          },
          error => this.error = error          
    );
    */
  }
}
