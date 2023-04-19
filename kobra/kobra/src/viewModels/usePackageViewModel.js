import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export function usePackageViewModel() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);

      const db = getFirestore();
      const storage = getStorage();

      const snapshot = await db.collection("Packages").get();
      const fetchedPackages = [];

      for (const doc of snapshot.docs) {
        const data = doc.data();
        const id = doc.id;
        const medal = data.medal || "";
        const price = data.price || 0.0;
        const imageRef = ref(storage, `images/${medal}.jpg`);
        const imageUrl = await getDownloadURL(imageRef);

        const packageWithImage = {
          id,
          medal,
          price,
          imageUrl,
        };

        fetchedPackages.push(packageWithImage);
      }

      setPackages(fetchedPackages);
      setIsLoading(false);
    };

    fetchPackages();
  }, []);

  return {
    packages,
    isLoading,
  };
}
