import { AnnonceService } from './../../services/annonce.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-statistic',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent implements OnInit {

  mode='list';
  messages;
  pageOfItems: Array<any>;
  constructor(private annonceService:AnnonceService) {
    this.getAllMessage();
  }

  ngOnInit() {
    this.messages = this.messages.map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  getAllMessage() {
    this.annonceService.getAllRessources('/messages').subscribe(
      data => {
        this.messages = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
