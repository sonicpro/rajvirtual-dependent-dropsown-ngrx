import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Author } from '../shared/model/author';
import 'rxjs/add/observable/of';

@Injectable()
export class DefaultAuthorService {
  public loadDefaultAuthor(): Observable<Author> {
    return Observable.of({ name: "John" });
  }
}