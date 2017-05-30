import { Component, OnInit } from '@angular/core';
import {LocalService} from './service/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalService]
})
export class AppComponent  implements OnInit {
  title = 'Weather';
  localCoords: Object;
  error: String;

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.localService.getLocale().then(coord => this.localCoords = coord )
        .catch((err => this.error = err));

  }

  theWeather(msg: Object) {
    console.log('OBEYED!!!!', msg);
  }
}
