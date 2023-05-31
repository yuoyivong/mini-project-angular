import { Tasks } from './tasks.model';

export interface State {
  readonly tasks: Array<Tasks>;
}
