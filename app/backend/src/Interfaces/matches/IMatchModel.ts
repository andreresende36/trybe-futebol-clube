import { ICRUDModelCreator, ICRUDModelReader, ICRUDModelUpdater } from '../ICRUDModel';
import { IMatch } from './IMatch';
import { ID } from '..';

interface FindMatchesMethod<T> {
  findFinishedMatchesByTeamId(teamId: ID): Promise<T[]>
}

export type IMatchModel =
ICRUDModelReader<IMatch>
& ICRUDModelUpdater<IMatch>
& ICRUDModelCreator<IMatch>
& FindMatchesMethod<IMatch>;
