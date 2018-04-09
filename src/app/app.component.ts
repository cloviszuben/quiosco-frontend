import {Component} from '@angular/core';

import {MatMenuModule} from '@angular/material/menu';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  title = 'QUIOSCO';
  dataAtualizacao ='10/04/2018 12:33';


}
