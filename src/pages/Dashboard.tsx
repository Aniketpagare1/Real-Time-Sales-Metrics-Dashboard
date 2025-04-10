import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { database } from '../config/firebase';
import { ref, onValue } from 'firebase/database';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import { SalesDataPoint, ProductPerformance } from '../types/charts';

interface SalesData {
  totalSales: SalesDataPoint[];
  revenueGrowth: SalesDataPoint[];
  productPerformance: ProductPerformance[];
}

const chartDimensions = {
  width: 400,
  height: 300,
  margin: { top: 20, right: 30, bottom: 50, left: 50 }
};

const Dashboard: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData | null>(null);

  useEffect(() => {
    const salesRef = ref(database, 'sales');
    const unsubscribe = onValue(salesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSalesData(data);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sample data for development - remove when Firebase is connected
  const sampleData: SalesData = {
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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Sales Dashboard
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 360,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Total Sales
          </Typography>
          <LineChart 
            data={salesData?.totalSales || sampleData.totalSales}
            dimensions={chartDimensions}
          />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 360,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Revenue Growth
          </Typography>
          <LineChart 
            data={salesData?.revenueGrowth || sampleData.revenueGrowth}
            dimensions={chartDimensions}
            color="#2e7d32"
          />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 360,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Product Performance
          </Typography>
          <BarChart 
            data={salesData?.productPerformance || sampleData.productPerformance}
            dimensions={chartDimensions}
            color="#ed6c02"
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
