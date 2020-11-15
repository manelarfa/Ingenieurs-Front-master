import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
errorMessage = '';
  constructor(private router: Router, private auth: AuthenticationService, private httpClient: HttpClient) {
   }

  ngOnInit() {
  }

  onLogin(user) {
    this.errorMessage='';
    console.log(user);
    this.auth.login(user)
      .subscribe(
        resp => {

          //this.auth.convertToUser_= true;
          let jwt = resp.headers.get('Authorization');
          this.auth.saveToken(jwt);

          this.router.navigateByUrl("/menu");
        },
        err => {
          console.log(err);
          this.errorMessage='Vérifier vos informations';

         }
      );
    // this.router.navigateByUrl("/menu");
  }

  isAdmin() {
    return this.auth.isAdmin();
  }

  isUser() {
    return this.auth.isUser();
  }

  isAuthentificated() {
    return this.auth.isAuthentificated();
  }


}
