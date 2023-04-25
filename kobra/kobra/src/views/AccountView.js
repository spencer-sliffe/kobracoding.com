import React, { useState, useEffect } from 'react';
import './css/AccountView.css';
import { auth, db } from '../firebase.js';

const AccountView = () => {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

        // Fetch account data and set account state
        const data = doc.data();
        const email = user.email || 'test1@gmail.com';
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

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="account-view">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {account && (
            <div className="account-info">
              <div className="email">{account.email}</div>
              <div className="subscription">
                {account.subscription ? 'Subscribed' : 'Not Subscribed'}
              </div>
              {account.packageData && (
                <div className="package">
                  <div className="package-name">{account.packageData.name}</div>
                  <div className="package-price">${account.packageData.price}/month</div>
                </div>
              )}
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default AccountView;
