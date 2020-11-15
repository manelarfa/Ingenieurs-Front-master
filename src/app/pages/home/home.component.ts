import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavbarComponent } from './../../components/navbar/navbar.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(NavbarComponent, { static: false }) navbar: NavbarComponent;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  isAuthentificated() {
    return this.auth.isAuthentificated();
  }
  OnDeconnexion() {
    console.log("Deconnexion");
    this.auth.logOut();
    this.router.navigateByUrl('/index');

  }

}
