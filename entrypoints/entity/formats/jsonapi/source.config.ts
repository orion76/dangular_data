import {IEntryPointConfig, ISourceConfigAuth} from '@app-library/app-config';


export namespace EntrypointJsonAPI {
  export const config: IEntryPointConfig = {
    type: 'entity',
    prefixUrl: 'jsonapi'
  };


  export const sources: ISourceConfigAuth[] = [
    {entrypoint: 'entity', source: 'user', url: 'user'}
  ];
}

