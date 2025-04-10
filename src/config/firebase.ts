import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { SalesDataPoint, ProductPerformance } from '../types/charts';

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

// Helper function to initialize sample data
export const initializeSampleData = async () => {
  const sampleData = {
    totalSales: [
      { date: '2025-01-01', value: 1000 },
      { date: '2025-02-01', value: 1500 },
      { date: '2025-03-01', value: 1200 },
      { date: '2025-04-01', value: 1800 }
    ],
    revenueGrowth: [
      { date: '2025-01-01', value: 10 },
      { date: '2025-02-01', value: 15 },
      { date: '2025-03-01', value: 12 },
      { date: '2025-04-01', value: 18 }
    ],
    productPerformance: [
      { name: 'Product A', sales: 120 },
      { name: 'Product B', sales: 80 },
      { name: 'Product C', sales: 200 },
      { name: 'Product D', sales: 150 }
    ]
  };

  try {
    await set(ref(database, 'sales'), sampleData);
    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};

// Helper function to fetch sales data
export const fetchSalesData = async () => {
  try {
    const snapshot = await get(child(ref(database), 'sales'));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return null;
  }
};
