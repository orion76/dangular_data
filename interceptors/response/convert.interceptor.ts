import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';

import {of} from 'rxjs/internal/observable/of';
import {APP_CONFIG_SERVICE, IAppConfigService} from '../../../dangular-config';


export interface IResponseConverterPlugin {
  readonly entrypoint: string;

  convert<T>(event: HttpResponse<any>): any | Observable<any>;
}

export const RESPONSE_CONVERTER_PLUGIN = new InjectionToken<IResponseConverterPlugin>('RESPONSE_CONVERTER_PLUGIN');

@Injectable()
export class ConvertResponseInterceptor implements HttpInterceptor {
  logEnabled = false;

  constructor(
    @Inject(RESPONSE_CONVERTER_PLUGIN) private plugins: IResponseConverterPlugin[],
    @Inject(APP_CONFIG_SERVICE) private config: IAppConfigService,
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return next.handle(req).pipe(
      filter((event) => event instanceof HttpResponse),
      switchMap((event: HttpResponse<any>) => {

        let converted;
        try {
          // converted = this.getPlugin(req.url).convert(event.body);
        } catch (e) {
          console.error(e);
        }

        if ((converted instanceof Observable) === false) {
          converted = of(converted);
        }

        return converted.pipe(map((body: any) => event.clone({body})));
      }),
    );
    // tap(() => ),
  }

  // private getPlugin(url: string): IResponseConverterPlugin {
  //   const point = this.config.getEntrypoint(url);
  //   if (!point) {
  //     console.error('[RESPONSE_CONVERTER_PLUGIN]', 'Entrypoint  for url %s not found', url);
  //   }
  //   const candidates = this.plugins
  //     .filter((plugin: IResponseConverterPlugin) => plugin.entrypoint === point);
  //
  //   if (candidates.length === 0) {
  //     console.error('[RESPONSE_CONVERTER_PLUGIN]', 'Converter Plugin for Entrypoint %s not found', point);
  //   }
  //
  //   if (candidates.length > 1) {
  //     console.error('[RESPONSE_CONVERTER_PLUGIN]', 'Found 2 Converter Plugins for Entrypoint %s not found', point, candidates);
  //   }
  //
  //   return candidates.pop();
  // }
}
