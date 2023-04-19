import { useState, useEffect } from 'react';
import { auth, firestore } from './firebase'; // Import firebase configurations

const useAccountViewModel = () => {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchAccount = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.error('Error: No user is currently signed in.');
        return;
      }

      const ref = firestore.collection('Accounts').doc(user.uid);

      try {
        const doc = await ref.get();
        if (!doc.exists) {
          console.error('Error: Account document not found.');
          return;
        }

        const data = doc.data();
        const email = user.email || '';
        const subscription = data.subscription || false;
        const accountData = { id: user.uid, email, subscription, packageData: null, profilePicture: null };

        if (data.packageId) {
          const packageRef = firestore.collection('Packages').doc(data.packageId);
          const packageDoc = await packageRef.get();

          if (!packageDoc.exists) {
            console.error('Error: Package document not found.');
            return;
          }

          const packageData = packageDoc.data();
          const packageObj = {
            id: packageDoc.id,
            name: packageData.name,
            price: packageData.price,
          };
          accountData.packageData = packageObj;
        }

        setAccount(accountData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    fetchAccount();
  }, []);

  // You can add other functionality or state management as needed

  return { account, isLoading, userPosts };
};

export default useAccountViewModel;
