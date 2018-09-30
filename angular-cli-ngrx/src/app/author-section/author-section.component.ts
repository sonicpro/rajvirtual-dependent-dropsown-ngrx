import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { DefaultAuthorService } from '../services/default-author-service';
import { Store } from '@ngrx/store';
import {  Subscription } from "rxjs";
import { Observable } from 'rxjs/Observable';
import { Author } from "../shared/model/author";

@Component({
  selector: 'author-section',
  templateUrl: './author-section.component.html',
  styleUrls: ['./author-section.component.css']
})
export class AuthorSectionComponent implements OnInit, OnDestroy {

  @Output()
  updateFilter = new EventEmitter();

  authors$;
  private defaultAuthor$: Observable<Author>;
  data;
  private subscription: Subscription;

  constructor(private service: AuthorService, private store: Store<any>, private defaultAuthorService: DefaultAuthorService) {

  }

  ngOnInit() {
    this.authors$ = this.service.loadAllAuthors();
    this.defaultAuthor$ = this.defaultAuthorService.loadDefaultAuthor();
    this.subscription = this.defaultAuthor$.subscribe((author: Author) => this.updateFilter.emit(author.name));
  }

  onSelectAuthor(author: string) {
    this.updateFilter.emit(author);
    const filter = author === 'All' ? author : 'Other';
    this.store.dispatch({ type: '', payload: { type: filter, value: author } });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
