import { Box, ImageListItem, ImageListItemBar } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Image from 'next/image'
import React from 'react'

interface Props {
  data: any;
  grid: number;
  start: number;
  num: number;
}

const ImageLinks = ({ data, grid, start, num }: Props) => {
  if (!data || Object.keys(data).length === 0) {
    return <></>;
  }

  const itemData = Object.keys(data)
    .filter(key => key.startsWith('image'))
    .slice(start - 1, start + num - 1)
    .map(key => ({
      title: data[`name${key.slice(5)}`] || `Image ${key.slice(5)}`,
      path: data[key] || '',
    }));

  return (
    <Box>
      <Grid container spacing={5}>
        {itemData.map((item, index) => (
          <Grid xs={12} sm={12} md={grid} key={index}>
            <ImageListItem sx={{ height: '100% !important', width: '100% !important' }}>
              <Image
                className="w-full h-full object-cover"
                src={item.path}
                alt={item.title}
                loading="lazy"
                width={400}
                height={400}
              />
              <ImageListItemBar title={item.title} />
            </ImageListItem>
          </Grid>
        ))}
      </Grid>
    </Box>

  )
}

export default ImageLinks