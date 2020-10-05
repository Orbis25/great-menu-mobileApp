import {UserCreateVM, UserAuthVm, User, AuthLevel} from '../../models/User';
import {firebaseConfig} from '../../firebase';
import {collections} from '../../firebase/collections';

export default class AuthService {
  auth = firebaseConfig.auth();
  db = firebaseConfig.firestore();
  async register(model: UserCreateVM) {
    //create user
    // result userCreated
    const userCreated = await this.auth.createUserWithEmailAndPassword(
      model.userName,
      model.password,
    );

    if (!!userCreated.user) {
      //creating user for save to deb collection
      const user: User = {
        fullName: model.fullName,
        rol: AuthLevel.User,
        userName: model.userName,
        userUid: userCreated.user.uid,
      };
      //create the user in to db
      await this.db.collection(collections.users).add(user);
    }

    //login user
    await this.auth.signInWithEmailAndPassword(model.userName, model.password);

    //update fullname
    return await this.auth.currentUser?.updateProfile({
      displayName: model.fullName,
    });
  }

  async login(user: UserAuthVm) {
    return await this.auth.signInWithEmailAndPassword(
      user.userName,
      user.password,
    );
  }

  async signOut(): Promise<void> {
    return await this.auth.signOut();
  }
}
