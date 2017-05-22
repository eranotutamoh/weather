import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
 @Input() localCoord: Object;
 @Output() slobbed = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  slob(): void {
      console.log('SLOB', this.localCoord);
      this.slobbed.emit('SLOB said hello');
  }

}
