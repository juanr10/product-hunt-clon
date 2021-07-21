import app from 'firebase/app';
import firebaseConfig from './config';
import 'firebase/auth';

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        //Get access to auth methods
        this.auth = app.auth();
    }

    /**
     * @name: register.
     * @description: creates asynchronously a new user using Firebase methods. 
     * @param: name, email & password.
     * @return: none.
    */
    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

        return await newUser.user.updateProfile({
            displayName: name
        });
    }
}

const firebase = new Firebase();
export default firebase;