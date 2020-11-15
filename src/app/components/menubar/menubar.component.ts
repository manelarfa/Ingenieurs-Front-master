import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor(private auth: AuthenticationService,private router:Router) { }

  ngOnInit() {
  }
  OnDeconnexion() {
    console.log("Deconnexion");
    this.auth.logOut();
    this.router.navigateByUrl('/index');

  }

}
