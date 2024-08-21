"use client";
import { getAllCateProj } from "@app/user/categories/_server/FormCateProjectAction";
import { getAllCate } from "@app/user/categories/_server/TableCategoriesAction";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { getAllCateProjNoId } from "../_server/Category.Action";
import CateCarousel from "./CateCarousel";

const Category = () => {
  const [cate, setCate] = useState<any[]>([]);
  const [catePrj, setCatePrj] = useState<any[]>([]);
  const [cateAll, setCateAll] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cateName, setCateName] = useState("");


  const init = async () => {
    const cate = await getAllCate();
    setCate(cate);
    getAllCateDetail();
    setLoading(false);
  };

  const handleChangeCate = async (item: any, cate_name: string) => {
    let data = { cate_id: item };
    let rs = await getAllCateProj(data);
    if (rs) {
      rs.forEach((element: any) => {
        element.detail = element.detail.split("\n").filter((field: string) => field.trim() !== "");
      });
      setCatePrj(rs);
    }
    setCateName(cate_name)
  };

  const getAllCateDetail = async () => {
    let rs = await getAllCateProjNoId();
    if (rs) {
      rs.forEach((element: any) => {
        element.detail = element.detail.split("\n").filter((field: string) => field.trim() !== "");
      });
      setCateAll(rs);
      setCatePrj(rs);
    }
    setCateName("ALL CATEGORIES")
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
  { loading ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Box
        sx={{
          height: '500px',
          backgroundImage: `url(${"/asset/img/projects/catotegry_hero.png"})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'flex-start', 
          paddingLeft: '25px',
        }}
      >
        <Typography variant="h3" className="font-bold text-white">
        Reference List
        </Typography>
      </Box>
      <CateCarousel
        cate={cate}
        cateAll={cateAll}
        handleChangeCate={handleChangeCate}
        getAllCateDetail={getAllCateDetail}
      />
      <Box>
        <Button
          className="h-16 px-8 py-5 bg2-mte text-white text-xl font-bold my-4"
          fullWidth
          variant="text"
        >
          {cateName}
        </Button>
      </Box>
      <Box className="max-h-[600px] overflow-y-auto overflow-x-hidden">
        <Grid container spacing={5} className="mt-4">
          {catePrj.map((item, index) => (
            <Grid xs={12} md={6} key={index} sx={{ display: 'flex' }}>
              <Box className="w-full mb-10" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box className="h-full" display="flex" flexDirection={{ xs: "column", sm: "row" }} sx={{ alignItems: 'flex-start' }}>
                  <Box className="w-full sm:w-1/3 ms-6" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <Button className="bg2-mte text-white px-5" variant="text">
                      {item.cate_title}
                    </Button>
                    <List>
                      <ListItem disablePadding>
                        <ListItemIcon sx={{ justifyContent: "center" }}>
                          <MdOutlineLocationOn size="1.5rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                              {item.location}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                    <Typography variant="h6" className="ms-2 txt-mte flex items-center font-bold">
                      {item.cate_pro_name}
                    </Typography>
                  </Box>
                  <Box className="w-full sm:w-2/3" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {item.detail.map((detailItem: any, index: number) => (
                      <ListItem
                        alignItems="flex-start"
                        key={index}
                        sx={{ padding: "0", margin: "0" }}
                      >
                        <ListItemIcon
                          sx={{ minWidth: "30px", ml: detailItem.endsWith(":") ? 0 : 2 }}
                        >
                          {detailItem.endsWith(":") ? "" : <BsDot />}
                        </ListItemIcon>
                        <ListItemText className="pr-2"
                          primary={detailItem.endsWith(":") ? detailItem.slice(0, -1) : detailItem}
                          primaryTypographyProps={{
                            fontWeight: detailItem.endsWith(":") ? "bold" : "normal",
                          }}
                        />
                      </ListItem>
                    ))}
                  </Box>
                </Box>
                <Divider className="bg2-mte mt-5" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
    )}
    </>
  );
};

export default Category;
