import {IJSONRPCResponse} from '@app-services/data/entrypoints/rpc/formats/jsonrpc/types';


export function convert(response: IJSONRPCResponse) {
  return response.result;
}

