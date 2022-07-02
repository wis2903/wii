import { FirebaseApp, initializeApp } from 'firebase/app';

class FirebaseService {
    private static inst?: FirebaseService;
    private app: FirebaseApp;
    
    constructor() {
        const firebaseConfig = {
            apiKey: 'AIzaSyC6QJ-9WaSt8YzQ29OrhnJ1Xe77uwSEF7c',
            authDomain: 'wii-mall.firebaseapp.com',
            projectId: 'wii-mall',
            storageBucket: 'wii-mall.appspot.com',
            messagingSenderId: '140373026632',
            appId: '1:140373026632:web:ca4d658b7f45690b44357d',
            measurementId: 'G-TDV6N92YWY'
          };
          
          // Initialize Firebase
          this.app = initializeApp(firebaseConfig);
    }

    public static get instance(): FirebaseService {
        if (!FirebaseService.inst) FirebaseService.inst = new FirebaseService();
        return FirebaseService.inst;
    }
}

export default FirebaseService;