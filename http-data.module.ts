import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {TRANSPORT_SERVICE} from './transport/types';
import {TransportService} from './transport/transport.service';
import {CONFIG_ENTRYPOINT, CONFIG_SOURCE, IEntryPointConfig, IModelConfig} from '../dangular-config';
import {
  ENTITY_ENTRYPOINT,
  ENTITY_REQUEST_FACTORY,
  ENTITY_RESPONSE_CONVERTER,
  IEntityEntrypoint,
  IEntityRequestFactory
} from './entrypoints/entity/types';
import {IResponseConverter} from './entrypoints/types';
import {IRPCEntrypoint, IRPCRequestFactory, RPC_ENTRYPOINT, RPC_REQUEST_FACTORY, RPC_RESPONSE_CONVERTER} from './entrypoints/rpc/types';
import {
  AUTH_ENTRYPOINT,
  AUTH_REQUEST_FACTORY,
  AUTH_RESPONSE_CONVERTER,
  IAuthRequestFactory,
  IEntrypointAuth
} from './entrypoints/auth/types';


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

  static configSource(config: IModelConfig<any>[]): ModuleWithProviders<HTTPDataModule> {
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
