import { AnnonceService } from './../../services/annonce.service';
import { Component, OnInit, ContentChildren } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { timer } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  errorMessage='';
  message='';
  constructor(private annonceService:AnnonceService) { }

  ngOnInit() {

  }

  onSendMessage(value)
  {
    console.log(value);
    const path = '/messages';
    this.annonceService.postRessource(path, value).
      subscribe(
        data => {
this.message='Votre message a été bien envoyé !';
const source = timer(3000);
const subscribe = source.subscribe(val => {this.message='';});
        },
        err => {
          console.log(err);
        }
      );
  }
}
