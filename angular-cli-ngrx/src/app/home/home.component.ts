import { Component, OnInit, OnDestroy } from '@angular/core';
import { DefaultAuthorService } from '../services/default-author-service';
import { Store } from '@ngrx/store';
import {  Subscription } from "rxjs";
import { Observable } from 'rxjs/Observable';
import { Author } from "../shared/model/author";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private defaultAuthor$: Observable<Author>;
  private subscription: Subscription;
  filter = 'All';
  constructor( private store: Store<any>, private defaultAuthorService: DefaultAuthorService) { }

  ngOnInit() {
    
    this.defaultAuthor$ = this.defaultAuthorService.loadDefaultAuthor();
    this.subscription = this.defaultAuthor$.subscribe((author: Author) => this.updateFilter(author.name));
  }

  updateFilter(filter) {
    this.filter = filter;
    console.log(filter);
    const filterType = filter === 'All' ? filter : 'Other';
    this.store.dispatch({ type: '', payload: { type: filterType, value: filter } });
  }
  
  public form = new FormGroup({
    author: new FormControl("")
  });  

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
