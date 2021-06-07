import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/services/data.service'
 
@Component({
  selector: 'app-aboutsection',
  templateUrl: './aboutsection.component.html',
  styleUrls: ['./aboutsection.component.css']
})
export class AboutsectionComponent implements OnInit {
  data: any = null
  constructor(private _dataservice: DataService) {
    this.data = _dataservice.getAbout()
   }

  ngOnInit(): void {
  }

}
