const { initializeApp } = require('firebase/app');
const config = require('./config.json');
const {
    collection,
    deleteDoc,
    documentId,
    getDocs,
    getFirestore,
    query,
    where,
    addDoc,
    setDoc,
    doc,
} = require('firebase/firestore');

const app = initializeApp(config.firebase);
const db = getFirestore(app);

module.exports = {
    getDocuments: async (collectionName, constraint, noDebouce) => {
        return new Promise(resolve => {
            try {
                const q = constraint ? query(collection(db, collectionName), constraint) : collection(db, collectionName);
                const documents = [];
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
    },
    deleteDocument: async (collectionName, docId) => {
        return new Promise((resolve) => {
            try {
                getDocs(query(collection(db, collectionName), where(documentId(), '==', docId))).then(async querySnapshot => {
                    await deleteDoc(querySnapshot.docs[0].ref);
                    resolve(true);
                });
            } catch (e) {
                resolve(false);
            }
        });
    },
    addDocument: async (collectionName, data) => {
        try {
            const dbRef = collection(db, collectionName);
            const docRef = await addDoc(dbRef, data);
            return docRef.id;
        } catch (e) {
            // handle error
        }
        return undefined;
    },
    updateDocument: async (collectionName, docId, data) => {
        try {
            const docRef = doc(db, collectionName, docId);
            await setDoc(docRef, data);
            return true;
        } catch (e) {
            // handle error
        }
        return false;
    }
}