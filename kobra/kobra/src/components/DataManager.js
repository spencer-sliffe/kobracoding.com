import { collection, getDocs, doc } from "firebase/firestore";
import { Firestore } from "./firebaseConfig"; // Replace with your Firebase configuration import

class DataManager {
    constructor() {
        this.packages = [];
        this.fetchPackages();
    }
    
    async fetchPackages() {
        this.packages = [];
        const db = Firestore;
        const ref = collection(db, "Packages");

        try {
            const snapshot = await getDocs(ref);
            snapshot.forEach((docSnapshot) => {
                const data = docSnapshot.data();
                const id = data.id || "";
                const name = data.name || "";
                const price = data.price || 0.0;
                const packageObj = new Package(id, name, price);
                this.packages.push(packageObj);
            });
        } catch (error) {
            console.error(error.message);
        }
    }
}

export default DataManager;
