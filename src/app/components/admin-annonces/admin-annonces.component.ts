import { AnnonceService } from './../../services/annonce.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-annonces',
  templateUrl: './admin-annonces.component.html',
  styleUrls: ['./admin-annonces.component.scss']
})
export class AdminAnnoncesComponent implements OnInit {

  annonceClicked;
  closeResult;
  mode = 'list';
  pageOfItems: Array<any>;
  annonces;
  constructor(private annonceService: AnnonceService,private modalService: NgbModal) {
    this.getAllAnnonce();
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
onCancel()
{
  this.mode='list';
}

  ngOnInit() {
  }
  open(content,annonce) {
    this.annonceClicked=annonce;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }
  onAnnonceClick(a)
  {
    console.log(a);
  }

  getAllAnnonce() {
    this.annonceService.getAllAnnonces().subscribe(
      data => {
        this.annonces = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onNewAnnonce() {
    if (this.mode != 'new-annonce') {
      this.mode = 'new-annonce';
    } else {
      this.mode = 'list';
    }
  }
  onSaveAnnonce(value) {
    console.log(value);
    this.mode = 'list';
    const path = '/annonces';
    this.annonceService.postRessource(path, value).
      subscribe(
        data => {
          this.getAllAnnonce();
          //this.loadPage(this.paginationService.getNumberOfPages() - 1);
        },
        err => {
          console.log(err);
        }
      );
  }

}
