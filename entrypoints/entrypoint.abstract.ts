import {IEntrypointService, IResponseConverter} from './types';


export abstract class EntrypointAbstractService implements IEntrypointService {

  constructor(protected handler: IResponseConverter) {

  }
}
