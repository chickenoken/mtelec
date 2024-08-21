"use server";
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

export const getVisitorData = async () => {
  try {
    const keyFilePath = path.join(process.cwd(), 'credentials.json');
    const credentials = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsData = google.analyticsdata('v1beta');
    const propertyId = '453505751';

    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: '2024-01-01', endDate: 'today' }], 
        metrics: [{ name: 'activeUsers' }],
      },
      auth,
    });

    const rows = response?.data?.rows;
    if (rows && rows.length > 0) {
      const visitors = rows[0]?.metricValues?.[0]?.value;
      return visitors ? parseInt(visitors, 10) : 0;
    }
    return 0;
  } catch (error) {
    return null;
  }
};
