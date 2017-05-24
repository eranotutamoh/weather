import { Component, EventEmitter, OnInit, OnChanges, Input, Output } from '@angular/core';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit, OnChanges {
 @Input() localCoord: Object;
 @Output() slobbed = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
      if (this.localCoord) { // get details from api
           }
  }
  slob(): void {
      console.log('SLOB', this.localCoord);
      this.slobbed.emit('SLOB said hello');
  }

}
