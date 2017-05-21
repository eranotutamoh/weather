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
  local = 'Loading local data';

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.localService.getLocale().then(local => this.local = local);
    navigator.geolocation.getCurrentPosition((pos) => console.log(pos));
  }

  obeyOutput(msg: String) {
    console.log('OBEYED!!!!', msg);
  }
}
