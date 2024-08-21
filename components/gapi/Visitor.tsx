"use client";
import React, { useEffect, useState } from 'react';
import { getVisitorData } from './_server/VisitorAction';
import { Box, Typography } from '@mui/material';

const Visitor = () => {
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const visitorCount = await getVisitorData();
      setVisitors(visitorCount);
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography className="font-bold" sx={{ color: 'white' }}>
        Number of viewers: {visitors !== null ? visitors.toLocaleString() : 'Loading...'}
      </Typography>
    </Box>
  );
};

export default Visitor;
