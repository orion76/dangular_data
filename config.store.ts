import {BehaviorSubject, Observable} from 'rxjs';
import {IConfigStore, ISourceKeys, TConfigEntityTypes} from './types';

export class ConfigStore<T extends ISourceKeys> implements IConfigStore<T> {

  private store: Map<string, TConfigEntityTypes<BehaviorSubject<T>>> = new Map();

  createPath(path: string[]): Map<string, BehaviorSubject<T>> {
    return path.reduce((parent: Map<string, any>, key) => {
      if (!parent.has(key)) {
        parent.set(key, new Map());
      }
      return parent.get(key);
    }, this.store);
  }

  get(path: string[], id: string): Observable<T> {
    const parent = this.createPath(path);
    if (!parent.has(id)) {
      parent.set(id, new BehaviorSubject(null));
    }
    return parent.get(id).asObservable();
  }

  has(path: string[], id: string): boolean {
    return this.createPath(path).has(id);
  }

  set(path: string[], id: string, item: T) {
    const subject: BehaviorSubject<T> = new BehaviorSubject(item);
    this.createPath(path).set(id, subject as BehaviorSubject<T>);
  }

}
