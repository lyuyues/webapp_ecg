import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['../bootstrap-custom.css', '../common.css','./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  lat: number = 48.463407;
  lng: number = -123.311693;
  constructor() { }

  ngOnInit() {
  }

}
