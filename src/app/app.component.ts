import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-block-test';

  constructor(private router: Router) { }

  // Verificacao de rota
  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

}
