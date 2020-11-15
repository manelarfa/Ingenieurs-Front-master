import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-doctorants',
  templateUrl: './admin-doctorants.component.html',
  styleUrls: ['./admin-doctorants.component.scss']
})
export class AdminDoctorantsComponent implements OnInit {

  mode = 'list';
  pageOfItems: Array<any>;
  editdoctorant;
  constructor(private auth: AuthenticationService) {
    this.getAllUsers();
  }
  doctorants;
  ngOnInit() {

  }
  onEdit(d)
  {
    this.editdoctorant=d;
    console.log(d);
    this.mode='edit-doctorant';
  }
  onCancel()
  {
    this.mode='list';
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  getAllUsers() {
    this.auth.getAllUsers()
      .subscribe(
        data => {
          let dataEmbeded = data['_embedded'];
          this.doctorants = dataEmbeded['users'];
          // this.initiliazePagination(this.users);
        },
        err => { console.log(err) }

      )
  }
  onNewDoctorant() {
    if (this.mode != 'new-doctorant') {
      this.mode = 'new-doctorant';
    } else {
      this.mode = 'list';
    }
  }

  onSaveDoctorant(value) {
    value.role = 'USER';
    if (value.active == '') {
      value.active = false;
    }
    console.log(value);
    this.mode = 'list';
    let url = this.auth.host + '/register';
    this.auth.postRessource(url, value).
      subscribe(
        data => {
          this.getAllUsers();
          //this.loadPage(this.paginationService.getNumberOfPages() - 1);
        },
        err => {
          console.log(err);
        }
      );
  }

  OnDeleteDoctorant(d) {
    let c = confirm("Etes vous sûre ?");
    if (!c) return;
    console.log("Delete");
    this.auth.deleteRessource(d._links.self.href).
      subscribe(
        data => {
          this.getAllUsers();
        },
        err => { console.log(err); }
      )
  }

}
