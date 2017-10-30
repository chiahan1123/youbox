import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ProgressService implements OnDestroy {

  emitChangeSource = new Subject<boolean>();

  changeEmitter = this.emitChangeSource.asObservable();

  show() {
    this.emitChangeSource.next(true);
  }

  hide() {
    this.emitChangeSource.next(false);
  }

  ngOnDestroy() {
    this.emitChangeSource.complete();
  }

}
