import {Inject, Injectable, InjectionToken} from '@angular/core';
import {IEntity} from '@xangular-common/entity';
import {Observable} from 'rxjs';
import {Params} from '@angular/router';

export interface IEntryPoint {
  type: string;
}

export const ENTRY_POINT = new InjectionToken<IEntryPoint>('ENTRY_POINT');
export const ENTRYPOINTS_SERVICE = new InjectionToken<IEntrypointsService<any>>('ENTRYPOINTS_SERVICE');


export interface IEntryPointJsonAPI extends IEntryPoint {
  type: 'jsonapi';

  getEntity(source: string, id: string): Observable<IEntity>;

  getEntities(source: string): Observable<IEntity[]>;
}


export interface IEntryPoints<E = undefined, C = undefined, A = undefined> {
  entity?: E;
  command?: C;
  auth?: A;
}

type TEntryPoints<T> = {
  readonly [P in keyof T]: T[P];
};


export interface IEntrypointsService<E> {
  get<K extends keyof E>(type: K): E[K];

}

@Injectable()
export class EntrypointsService<T> implements IEntrypointsService<T> {

  private _entrypoints: Partial<TEntryPoints<T>>;

  constructor(@Inject(ENTRY_POINT) private entrypoints: IEntryPoint[]) {
    this._entrypoints = entrypoints
      .reduce((points: TEntryPoints<T>, point: IEntryPoint) => points[point.type] = point, {});


  }

  get<K extends keyof T>(type: K): T[K] {
    return this._entrypoints[type];
  }
}

export type TEntrypointsService = IEntrypointsService<IEntryPoints<IEntryPointJsonAPI>>;

@Injectable()
export class TestService {
  constructor(@Inject(ENTRYPOINTS_SERVICE) private data: TEntrypointsService) {

    this.data
      .get('entity')
      .getEntity('', '')
      .pipe();
  }
}
