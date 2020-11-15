import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  constructor(private router: Router, private auth: AuthenticationService, private httpClient: HttpClient) { }

  isAdmin() {
    if (this.auth.isAdmin()) {
      return 'true';
    }

    return '';
  }

  isUser() {
    return this.auth.isUser();
  }

  isAuthentificated() {
    return this.auth.isAuthentificated();
  }


}
