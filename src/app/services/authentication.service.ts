import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = 'http://localhost:8085';
  public jwt: string;
  private email: string;
  public firstName: string;
  public lastName: string;
  private roles: Array<string>;
  public convertToUser_ = false;
  constructor(private httpClient: HttpClient) {
    try {
      this.loadToken();
    } catch (error) {
      console.log(error);
    }

  }

  public login(data) {
    return this.httpClient.post(this.host + '/login', data, { observe: 'response' });
  }


  public saveToken(jwt) {
    localStorage.setItem('token', jwt);
    localStorage.setItem('isconvert', String(this.convertToUser_));
    this.jwt = jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJwt = jwtHelper.decodeToken(this.jwt);
    this.email = objJwt.sub;
    console.log(this.email);
    this.getUserByEmail(this.email).subscribe
    (
      data=>{
          this.firstName=data["firstname"];
          this.lastName=data["lastname"];
          console.log(data);
      },
      err=>{
        console.log("error");
      }
    );
    console.log(this.email);
    this.roles = objJwt.roles;
    if (this.convertToUser_) {
      this.convertToUser();
    }

  }


  convertToUser() {
    const index = this.roles.indexOf('ADMIN', 0);
    if (index > -1) {
      this.roles.splice(index, 1);
    }
  }
  onlyAdmin() {
    if (!this.isAdmin()) {
      this.logOut();
      return false;
    }
    return true;
  }

  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }

  isAuthentificated() {
    return this.roles != undefined;
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.convertToUser_ = (localStorage.getItem('isconvert') == 'true');
    this.parseJWT();
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('isconvert');
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.email = undefined;
    this.roles = undefined;
  }

  getAllUsers() {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.get(this.host + '/users', { headers: headers });
  }
  getUserByEmail(email) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.get(this.host + '/users/search/byEmail?email='+email, { headers: headers });
  }
  getAllRoles() {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.get(this.host + '/appRoles', { headers: headers });
  }

  public getRessource(url) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.get(url, { headers: headers });
  }
  public postRessource(url, data) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.post(url, data, { headers: headers });
  }

  public deleteRessource(url) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.delete(url, { headers: headers });
  }


}
