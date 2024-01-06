import auth from "@react-native-firebase/auth";

export const createAccountWithEmail = async (
  email: string,
  password: string
) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const loginWithEmail = async (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};
