import { FirebaseApp, initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import config from '../config.json';
import {
    collection,
    deleteDoc,
    DocumentData,
    documentId,
    Firestore,
    getDocs,
    getFirestore,
    query,
    where,
    addDoc,
    setDoc,
    doc,
    QueryConstraint,
} from 'firebase/firestore';

class FirebaseService {
    private static inst?: FirebaseService;
    private app: FirebaseApp;
    private db: Firestore;

    constructor() {
        this.app = initializeApp(config.firebase);
        this.db = getFirestore(this.app);
    }

    public static get instance(): FirebaseService {
        if (!FirebaseService.inst) FirebaseService.inst = new FirebaseService();
        return FirebaseService.inst;
    }

    public getDocuments = async (collectionName: string, constraint?: QueryConstraint, noDebouce?: boolean): Promise<{ id: string, data: DocumentData }[]> => {
        return new Promise(resolve => {
            try {
                const q = constraint ? query(collection(this.db, collectionName), constraint) : collection(this.db, collectionName);
                const documents: { id: string, data: DocumentData }[] = [];
                getDocs(q).then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        documents.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    });
                    if (noDebouce) {
                        resolve(documents);
                    } else {
                        setTimeout(() => {
                            resolve(documents);
                        }, 500);
                    }
                });
            } catch (e) {
                resolve([]);
            }
        });
    }

    public deleteDocument = async (collectionName: string, docId: string): Promise<boolean> => {
        return new Promise((resolve) => {
            try {
                getDocs(query(collection(this.db, collectionName), where(documentId(), '==', docId))).then(async querySnapshot => {
                    await deleteDoc(querySnapshot.docs[0].ref);
                    resolve(true);
                });
            } catch (e) {
                resolve(false);
            }
        });
    }

    public addDocument = async (collectionName: string, data: Record<string, unknown>): Promise<string | undefined> => {
        try {
            const dbRef = collection(this.db, collectionName);
            const docRef = await addDoc(dbRef, data);
            return docRef.id;
        } catch (e) {
            // handle error
        }
        return undefined;
    }

    public updateDocument = async (collectionName: string, docId: string, data: Record<string, unknown>): Promise<boolean> => {
        try {
            const docRef = doc(this.db, collectionName, docId);
            await setDoc(docRef, data);
            return true;
        } catch (e) {
            // handle error
        }
        return false;
    }

    public uploadFile = async (file: File): Promise<string> => {
        return new Promise(resolve => {
            const storage = getStorage();
            const storageRef = ref(storage, `images/${+new Date()}-${file.name.replace(/[ \\(\\)]/g, '-')}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // handle progress
                },
                (error) => {
                    resolve('');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    }).catch(e => {
                        resolve('');
                    });
                }
            );
        });
    }
}

export default FirebaseService;