import { AnnonceService } from './../../services/annonce.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  annonces;
  constructor(private annonceService: AnnonceService) {
    this.getAllAnnonce();
  }

  ngOnInit() {
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

}
