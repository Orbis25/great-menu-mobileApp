import 'firesql/rx';
import {FireSQL} from 'firesql';

import {firebaseConfig} from '../../firebase';
import {collections} from '../../firebase/collections';
import {FoodState} from '../../models/Food';
import {Observable} from 'rxjs';
import {DocumentData} from 'firesql/utils';

export default class FoodService {
  db = firebaseConfig.firestore();

  async getAll(): Promise<Observable<DocumentData[]>> {
    this.db.settings({experimentalForceLongPolling: true});
    const fireSql = new FireSQL(this.db);
    const query = `SELECT id,name,price,category,description,State,photoUrl FROM ${collections.foods} where State = ${FoodState.Active}`;
    return fireSql.rxQuery(query);
  }

  async findByName(name: string): Promise<DocumentData[]> {
    const fireSql = new FireSQL(this.db);
    return fireSql.query(
      `SELECT * FROM ${
        collections.foods
      } WHERE name LIKE '${name.toLowerCase()}%'`,
    );
  }
}
