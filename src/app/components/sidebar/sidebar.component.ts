import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    role :string;
    icon: string;
    class: string;

}
export const ROUTES: RouteInfo[] = [
    { path: '/menu/doctorants', title: 'Doctorants',role:'ADMIN' , icon: 'now-ui-icons education_hat', class: '' },
    { path: '/menu/statistic', title: 'Statistiques', role:'ADMIN' ,  icon:'now-ui-icons files_single-copy-04', class: '' },
    { path: '/menu/profile', title: 'Profile', role:'USER' ,  icon:'now-ui-icons users_single-02', class: '' },
    { path: '/menu/test', title: 'Annonces', role:'ADMIN' ,  icon:'now-ui-icons ui-1_calendar-60', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
       if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  isAdmin()
  {
      return this.auth.isAdmin();
  }

  isUser()
  {
      return this.auth.isUser();
  }
}
