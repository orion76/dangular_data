import {IResponseConverter, IEntrypointService} from '@app-services/data';

export abstract class EntrypointAbstractService implements IEntrypointService {

  constructor(protected handler: IResponseConverter){

  }
}
