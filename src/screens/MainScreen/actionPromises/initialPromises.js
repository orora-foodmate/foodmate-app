
import {initialRealmClient} from '../../../store/realmManager';

export default async function initialPromise(setIsInitialApp) {
  try {
    await initialRealmClient();
    setIsInitialApp(true);
  }catch(error) {
    throw error;
  }
}