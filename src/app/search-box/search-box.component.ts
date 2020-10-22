import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['../bootstrap-custom.css', '../common.css', './search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() update = new EventEmitter()
  constructor() { }

  ngOnInit() {
    this.update.emit("");
  }
  onInput(value){
    this.update.emit(value);
  }

}
