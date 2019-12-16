import {IJSONRPCResponse} from './types';


export function convert(response: IJSONRPCResponse) {
  return response.result;
}

