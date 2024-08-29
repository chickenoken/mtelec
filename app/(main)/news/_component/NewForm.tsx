"use client"
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Divider, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react'
import { FaRegCalendar } from 'react-icons/fa';
import { format } from "date-fns";
import Link from 'next/link';
import { getNewMain, getNewOther } from '../_server/NewsAction';
import Image from 'next/image';

interface MainNew {
    file: string;
    type: string;
    title: string;
    dateUp: string;
    content: string;
    _id: string;
}
const NewForm = () => {
  const [mainNew, setMainNew] = useState<MainNew | null>(null);
  const [news, setNews] = useState<any[]>([]);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [loading, setLoading] = useState(true);

  const handleViewMore = () => {
    setItemsToShow(itemsToShow + 3);
  };

  const init = async () => {
    const nm = await getNewMain();
    setMainNew(nm);
    const ne = await getNewOther();
    setNews(ne);
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <>
    { loading ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ) : (
      <>
      <Box className="text-center my-10">
        <Typography variant="h4" gutterBottom className="trilong font-bold italic">Highlight</Typography>
      </Box>
      <Card elevation={10}>
        <Link href={`/news/detail/${mainNew?._id}`}>
          <CardActionArea>
            <Grid container spacing={2} alignItems="center">
              <Grid xs={12} md={4} style={{ position: 'relative', height: '300px' }}>
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={mainNew?.file ?? ""}
                    alt="alt"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Grid>
              <Grid xs={12} md={8} className="ps-8 pe-8 md:ps-14 md:pe-14">
                <Box className="py-5">
                  <Typography variant="body2" className="bg-mte text-white" 
                    sx={{ 
                      display: 'inline-block',
                      backgroundColor: 'lightgray',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'darkgray',
                      },
                      marginBottom: '20px',
                    }}>
                    {mainNew?.type}
                  </Typography>
                  <Typography variant="h5" className="txt-mte font-bold mb-2">{mainNew?.title}</Typography>
                  <Box display="flex">
                    <FaRegCalendar />
                    <Typography variant="body2" className="ms-2">{mainNew?.dateUp && format(new Date(mainNew.dateUp), 'yyyy/MM/dd')}</Typography>
                  </Box>
                  <Divider className='my-2'/>
                  <Typography variant="body2" className="mb-4">{mainNew?.content}</Typography>
                  <Typography variant="body2" className="txt-mte">View Details</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardActionArea>
        </Link>
      </Card>
      <Box className="text-center my-10">
        <Typography variant="h4" gutterBottom className="trilong font-bold italic">All News</Typography>
      </Box>
      <Grid container spacing={5}>
        {news && news.slice(0, itemsToShow).map((n: any) => (
          <Grid key={n._id} md={4}>
            <Card elevation={10} className='h-full'>
              <Link href={`/news/detail/${n._id}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100"
                    image={n.file}
                    alt="green iguana"
                    sx={{
                      objectFit: 'cover',
                      height: 300,
                    }}
                  />
                  <CardContent>
                  <Typography variant="body2" className="bg-mte text-white" 
                      sx={{ 
                        display: 'inline-block',
                        backgroundColor: 'lightgray',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'darkgray',
                        },
                        marginBottom: '20px',
                      }}>
                      {n.type}
                    </Typography>
                    <Typography variant="h5" className="txt-mte font-bold mb-2">{n.title}</Typography>
                    <Box display="flex">
                      <FaRegCalendar />
                      <Typography variant="body2" className="ms-2">{n.dateUp && format(new Date(n.dateUp), 'yyyy/MM/dd')}</Typography>
                    </Box>
                    <Divider className='my-2'/>
                    <Typography variant="body2" className="mb-4 truncate-3">{n.content}</Typography>
                    <Typography variant="body2" className="txt-mte">View Details</Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      {itemsToShow < news.length && 
        <Box className="my-10">
          <Button onClick={handleViewMore} className="h-16 px-8 py-5 mte-grey text-black text-xl font-bold mt-2" fullWidth variant="text">View More</Button>
        </Box>
      }
    </>
    )}
    </>
  )
}

export default NewForm