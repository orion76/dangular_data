import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {IResponseConverter} from '@app-services/data';
import {
  ENTITY_RESPONSE_CONVERTER,
  IEntityEntrypoint,
  ENTITY_REQUEST_FACTORY, ENTITY_ENTRYPOINT, IEntityRequestFactory
} from '@app-services/data/entrypoints/entity/types';
import {
  RPC_ENTRYPOINT,
  RPC_RESPONSE_CONVERTER,
  IRPCEntrypoint,
  IRPCRequestFactory,
  RPC_REQUEST_FACTORY
} from '@app-services/data/entrypoints/rpc/types';
import {
  AUTH_ENTRYPOINT,
  AUTH_RESPONSE_CONVERTER,
  IEntrypointAuth,
  IAuthRequestFactory,
  AUTH_REQUEST_FACTORY
} from '@app-services/data/entrypoints/auth/types';
import {TransportService} from '@app-services/data/transport/transport.service';
import {TRANSPORT_SERVICE} from '@app-services/data/transport/types';
import {IEntryPointConfig, ISourceConfig, CONFIG_SOURCE, CONFIG_ENTRYPOINT} from '@app-library/app-config';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [

    // {provide: HTTP_INTERCEPTORS, useClass: HeaderRequestInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: UrlRequestInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ConvertResponseInterceptor, multi: true},
    {provide: TRANSPORT_SERVICE, useClass: TransportService},
  ]
})
export class HTTPDataModule {

  static configEntrypoint(config: IEntryPointConfig): ModuleWithProviders<HTTPDataModule> {
    return {
      ngModule: HTTPDataModule, providers: [
        {provide: CONFIG_ENTRYPOINT, useValue: config, multi: true},
      ]
    };
  }

  static configSource(config: ISourceConfig[]): ModuleWithProviders<HTTPDataModule> {
    return {
      ngModule: HTTPDataModule, providers: [
        {provide: CONFIG_SOURCE, useValue: config, multi: true},
      ]
    };
  }

  static forEntity(
    entrypoint: Type<IEntityEntrypoint>,
    request: Type<IEntityRequestFactory>,
    response: Type<IResponseConverter>
  ): ModuleWithProviders<HTTPDataModule> {
    return {
      ngModule: HTTPDataModule, providers: [
        {provide: ENTITY_ENTRYPOINT, useClass: entrypoint},
        {provide: ENTITY_REQUEST_FACTORY, useClass: request},
        {provide: ENTITY_RESPONSE_CONVERTER, useClass: response}
      ]
    };
  }

  static forRPC(entrypoint: Type<IRPCEntrypoint>,
                request: Type<IRPCRequestFactory>,
                response: Type<IResponseConverter>
  ): ModuleWithProviders<HTTPDataModule> {
    return {
      ngModule: HTTPDataModule, providers: [
        {provide: RPC_ENTRYPOINT, useClass: entrypoint},
        {provide: RPC_REQUEST_FACTORY, useClass: request},
        {provide: RPC_RESPONSE_CONVERTER, useClass: response}
      ]
    };
  }

  static forAuth(entrypoint: Type<IEntrypointAuth>,
                 request: Type<IAuthRequestFactory>,
                 response: Type<IResponseConverter>
  ): ModuleWithProviders<HTTPDataModule> {
    return {
      ngModule: HTTPDataModule, providers: [
        {provide: AUTH_ENTRYPOINT, useClass: entrypoint},
        {provide: AUTH_REQUEST_FACTORY, useClass: request},
        {provide: AUTH_RESPONSE_CONVERTER, useClass: response}
      ]
    };
  }

}
