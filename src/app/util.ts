import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

export class Util {

  static ensureLogin<T>(afAuth: AngularFireAuth, observable: Observable<T>): Observable<T> {
    return afAuth.auth.currentUser === null
      ? Observable.fromPromise(afAuth.auth.signInAnonymously())
        .mergeMap(() => observable)
      : observable;
  }

}
