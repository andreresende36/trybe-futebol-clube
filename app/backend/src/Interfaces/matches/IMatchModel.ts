import { ICRUDModelReader, ICRUDModelUpdater } from '../ICRUDModel';
import { IMatch } from './IMatch';

export type IMatchModel = ICRUDModelReader<IMatch> & ICRUDModelUpdater<IMatch>;
