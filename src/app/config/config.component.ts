import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Config } from '../config';
import { ConfigService } from './config.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit{

  config: Config;

  listaIntervalosAtualizacao = [ 0, 1, 5, 15, 30, 60, 720, 1440];

  constructor(private location: Location, private configService: ConfigService) {}
 
  ngOnInit() {
    this.loadConfig();
  }
  
  loadConfig(): void {
    this.configService.loadConfig().subscribe((config) => this.config = config);

  }

  saveConfig(): void {
    this.configService.saveConfig(this.config);//.subscribe((config) => this.config = config);
    this.location.back();
  }

  goBack(): void {
   this.location.back();
  }

}
