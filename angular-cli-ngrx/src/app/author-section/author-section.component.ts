import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { Author } from "../shared/model/author";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'author-section',
  templateUrl: './author-section.component.html',
  styleUrls: ['./author-section.component.css']
})
export class AuthorSectionComponent implements OnInit {

  @Output()
  updateFilter = new EventEmitter();
  @Input() value: Author;
  @Input() public form: FormGroup;
  authors$;

  constructor(private service: AuthorService) {

  }

  ngOnInit() {
    this.authors$ = this.service.loadAllAuthors();
  }

  onSelectAuthor(author: string) {
    this.updateFilter.emit(author);
  }

}
