import {firebaseConfig} from '../../firebase';
import {collections} from '../../firebase/collections';
import {Order} from '../../models/Order';
import {generateId, getDateTimeNowStr} from '../../utils/shared';

export default class OrderService {
  db = firebaseConfig.firestore();

  async create(
    order: Order,
  ): Promise<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  > {
    order.createdAt = getDateTimeNowStr();
    order.id = generateId();
    return await this.db.collection(collections.orders).add(order);
  }

  async getStatus(
    id: string,
  ): Promise<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  > {
    return this.db.collection(collections.orders).doc(id);
  }

  async updateTime(id: string, time: number): Promise<void> {
    return this.db.collection(collections.orders).doc(id).update({time});
  }
}
