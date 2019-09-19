import realmHelper from '../../store/realmManager';
import {initialQueueFactory} from '../../store/taskManager'

function initialPromise() {
  return Promise.all([
    realmHelper.initialHelper(),
    initialQueueFactory(),
  ]);
}

export const initialAppAction = () => ({
  types: ['INITIAL_APP', 'INITIAL_APP_SUCCESS', 'INITIAL_APP_ERROR'],
  promise: initialPromise()
})