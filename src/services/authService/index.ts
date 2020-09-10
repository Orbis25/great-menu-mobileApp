import {UserCreateVM, UserAuthVm} from '../../models/User';
import {firebaseConfig} from '../../firebase';

export default class AuthService {
  auth = firebaseConfig.auth();
  async register(model: UserCreateVM) {
    //create user
    await this.auth.createUserWithEmailAndPassword(
      model.userName,
      model.password,
    );

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
}
