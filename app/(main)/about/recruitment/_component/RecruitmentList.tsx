"use client"
import { getAllRecruitment } from "@app/user/recruitment/_server/TableRecruitmentAction"
import { Box, Card, CardActionArea, CardContent, CircularProgress, Divider, ListItem, ListItemIcon, ListItemText, Pagination, Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsDot } from "react-icons/bs"
import { IoArrowForwardSharp } from "react-icons/io5"

const RecruitmentList = () => {
  const [recruitment, setRecruitment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const combineData = (data: any) => {
    return data.reduce((acc: any, curr: any) => {
      const existingIndex = acc.findIndex((item: any) => item.id_recruitment === curr.id_recruitment);
      if (existingIndex > -1) {
        acc[existingIndex].data.push(curr);
      } else {
        acc.push({ id_recruitment: curr.id_recruitment, data: [curr] });
      }
      return acc;
    }, []).map((item: any) => {
      item.data = item.data.map((dataItem: any) => {
        dataItem.job_description = dataItem.job_description.split('\n').map((line: string) => line.replace(/<p>|<\/p>/g, ''));
        return dataItem;
      });
      return item;
    });
  }

  const init = async () => {
    let re = await getAllRecruitment();
    re = combineData(re);
    setRecruitment(re);
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, [])

  const noOfPages = Math.ceil(recruitment.length / itemsPerPage);

  return (
    <>
    { loading ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ) : (
      <>
      <Grid container spacing={4} alignItems="stretch">
        {recruitment ? recruitment.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item: any, index: number) => (
          <Grid xs={12} lg={6} key={index}>
            <Card elevation={3} style={{ height: '100%' }}>
              <CardContent>
                <Link href={`/about/recruitment/detail/${item.data[0].id_recruitment}/${item.data[0].language}`}>
                  <CardActionArea>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="h5" component="div" className="txt-mte font-bold">
                        {item.data[0].title}
                      </Typography>
                      <Box display="flex">
                        <Typography variant="body2" className="font-bold me-2">
                          View Details
                        </Typography>
                        <IoArrowForwardSharp />
                      </Box>
                    </Box>
                  </CardActionArea>
                </Link>
                {item.data[1] ? (
                  <Link href={`/about/recruitment/detail/${item.data[1].id_recruitment}/${item.data[1].language}`}>
                    <CardActionArea>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5" component="div" className="txt-mte font-bold">
                          {item.data[1].title}
                        </Typography>
                        <Box display="flex">
                          <Typography variant="body2" className="font-bold me-2">
                            Xem Chi Tiết
                          </Typography>
                          <IoArrowForwardSharp />
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Link>
                ) : null}
                <Divider className="my-4" />
                {item.data[0].job_description ? item.data[0].job_description.map((val: any, ind: number) => (
                  <ListItem alignItems="flex-start" key={ind} sx={{ padding: '0', margin: '0' }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <BsDot />
                    </ListItemIcon>
                    <ListItemText primary={val} />
                  </ListItem>
                )) : null}
              </CardContent>
            </Card>
          </Grid>
        )) : null}
      </Grid>
      {recruitment && (
        <Box display="flex" justifyContent="center">
          <Pagination className="my-10 text-center" shape="rounded" count={noOfPages} page={page} onChange={(event, value) => setPage(value)} />
        </Box>
      )}
    </>
    )}
    </>
  )
}

export default RecruitmentList