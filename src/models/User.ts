export interface UserAuthVm {
  userName: string;
  password: string;
}

export interface CurrentUser {
  uid: string;
  userName: string;
  displayName: string;
  email: string;
  photoUrl: string;
  phoneNumber: string;
}

export interface UserCreateVM {
  fullName: string;
  userName: string;
  password: string;
}
