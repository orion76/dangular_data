import {IEntryPointConfig, ISourceConfigAuth} from '@app-library/app-config';

const sourceLogin: ISourceConfigAuth = {
  entrypoint: 'auth',
  source: 'login',
  url: 'token',
};


export namespace EntrypointOAuth {
  export const config: IEntryPointConfig = {
    type: 'auth',
    prefixUrl: 'oauth'
  };


  export const sources: ISourceConfigAuth[] = [
    sourceLogin,

  ];
}

