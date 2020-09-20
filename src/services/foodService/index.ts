import {firebaseConfig} from '../../firebase';
import {collections} from '../../firebase/collections';
import {FoodState} from '../../models/Food';

export default class FoodService {
  db = firebaseConfig.firestore();

  async getAll(): Promise<
    firebase.firestore.Query<firebase.firestore.DocumentData>
  > {
    this.db.settings({experimentalForceLongPolling: true});
    return this.db
      .collection(collections.foods)
      .where('State', '==', Number(FoodState.Active));
  }
}
