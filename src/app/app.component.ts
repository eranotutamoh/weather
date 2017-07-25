import { Component, OnInit } from '@angular/core';
import {LocalService} from './service/local.service';
import { Subscription } from 'rxjs/Subscription';
import { MessagerService } from './service/messager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalService, MessagerService]
})
export class AppComponent  implements OnInit {
  localCoords: Object;
  error: Boolean;
  appStatus: String;
  weatherSummary: Object;
  subscription: Subscription;

  constructor(private localService: LocalService, private messagerService: MessagerService) {
      this.subscription = this.messagerService.getMessage().subscribe(message => this.onError(message.text));
  }

  ngOnInit(): void {
    this.localService.getLocale().then(coord => this.setCoords(coord) )
        .catch((err => this.onError(err)));
    this.appStatus = 'finding your location ...';

  }

  setCoords(coords) {
      this.localCoords = coords;
      this.appStatus = 'getting local weather ...';
  }

  onError(err) {
      this.appStatus = err;
      this.error = true;
  }

  theWeather(weatherSummary: Object) {
    this.weatherSummary = weatherSummary;
    this.appStatus = '';
  }


}
