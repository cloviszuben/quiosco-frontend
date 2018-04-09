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

  constructor(private location: Location, private configService: ConfigService) {}
 
  ngOnInit() {
    this.getConfig();
  }
  
  getConfig(): void {
    this.configService.getConfig().subscribe((config) => this.config = config);

  }

  saveConfig(): void {
    this.configService.saveConfig(this.config);//.subscribe((config) => this.config = config);
    this.location.back();
  }

  goBack(): void {
   this.location.back();
  }

}
