import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(private auth:AuthenticationService,private router:Router) {
      this.sidebarVisible = false;
  }

  ngOnInit() {

  }
  sidebarOpen() {

  }
  sidebarClose() {

  }
  sidebarToggle() {

  }

  isDocumentation() {

  }

  isAuthentificated()
  {
    return this.auth.isAuthentificated();
  }
  OnDeconnexion() {
    console.log("Deconnexion");
    this.auth.logOut();
    this.router.navigateByUrl('/index');

  }
}
