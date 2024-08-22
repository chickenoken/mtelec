"use client";
import { Box, CardActionArea, CardContent, CardMedia, CircularProgress, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useEffect, useState } from "react"
import { FaArrowRight, FaRegCalendar, FaRegUser, FaSquare } from "react-icons/fa"
import { FiMapPin } from "react-icons/fi";
import { format } from "date-fns";
import { BsDot } from "react-icons/bs";
import { getAllProject } from "@app/user/project/_server/TableProjectAction";

const ProjectList = () => {
  const [project, setProject] = useState<any>();
  const [active, setActive] = useState<number>();
  const [prjName, setPrjName] = useState<string>();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [logoSrc, setLogo] = useState<string | null>(null);
  const [client, setClient] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [completeDate, setCompleteDate] = useState<string | undefined>();
  const [workField, setWorkField] = useState<any>();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    const pro = await getAllProject();
    setProject(pro);
    handleChangProj(pro[0]);
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, [])

  const handleChangProj = (item: any) => {
    if(!item) return;
    setActive(item._id);
    setPrjName(item.project_name);
    setClient(item.client);
    setLocation(item.location);
    setCompleteDate(item.complete_date);
    const workFieldArray = item.working_field.split('\n').filter((field: string) => field.trim() !== '');
    setWorkField(workFieldArray);
    setImageSrc(item.image);
    setLogo(item.logo);
  }

  return (
    <>
  { loading ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Grid container spacing={5}>
        <Grid xs={12} md={4}>
          <List sx={{ width: '100%', bgcolor: '#F5F5F5', padding: 4 }}>
            <Typography variant="h6" className="trilong text-black italic font-bold mb-4">Projects</Typography>
            {project && project.map((item: any, index: number) => (
              <ListItemButton key={item._id} onClick={() => handleChangProj(item)} className={`mb-4 bg-white ${active == item._id ? 'bg2-mte text-white' : ''}`} style={{padding: '5px 10px' }}>
                <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 700 }}>{item.project_name}</Typography>}/>
                <FaArrowRight />
              </ListItemButton>
            ))}
          </List>
        </Grid>
        <Grid xs={12} md={8}>
          <Box className="mb-4">
            <Typography className="txt-mte font-bold" variant="h4">{prjName}</Typography>
            <CardContent className="p-0 mt-4">
              <CardActionArea>
              { imageSrc && <CardMedia component="img" image={imageSrc} alt="Paella dish"/>}
              </CardActionArea>
            </CardContent>
          </Box>
          <Box>
            <Grid container spacing={3} className="p-3">
              <Grid xs={12} md={4} className="bg2-mte text-white">
                <CardContent className="p-0 mt-4">
                  <CardActionArea>
                  { logoSrc && <CardMedia component="img" image={logoSrc} alt="Paella dish"/>}
                  </CardActionArea>
                </CardContent>
                <List >
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ListItemIcon sx={{justifyContent: 'center', color: "white"}}>
                      <FaRegUser size="1.2rem" />
                    </ListItemIcon>
                    <Box style={{ width: '100%' }}>
                      <Typography variant="body2" className="mb-0">Client:</Typography>
                      <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{client}</Typography>}/>
                    </Box>
                  </Box>
                  <Divider className="my-2" style={{ backgroundColor: 'white' }} />
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ListItemIcon  sx={{justifyContent: 'center', color: "white"}}>
                      <FiMapPin size="1.2rem"/>
                    </ListItemIcon>
                    <Box style={{ width: '100%' }}>
                      <Typography variant="body2" className="mb-0">Location:</Typography>
                      <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{location}</Typography>}/>
                    </Box>
                  </Box>
                  <Divider className="my-2" style={{ backgroundColor: 'white' }} />
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ListItemIcon  sx={{justifyContent: 'center', color: "white"}}>
                      <FaRegCalendar size="1.2rem"/>
                    </ListItemIcon>
                    <Box style={{ width: '100%' }}>
                      <Typography variant="body2" className="mb-0">Completion time:</Typography>
                      {completeDate && <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {format(new Date(completeDate), 'MM/yyyy')}
                      </Typography>}/>}
                    </Box>
                  </Box>
                </List>
              </Grid>
              <Grid xs={12} md={8} sx={{ bgcolor: '#F5F5F5'}}>
                <Typography variant="h6" className="trilong text-black italic font-bold">Working fields</Typography>
                {workField && workField.map((item: any, index: number) => (
                  <ListItem alignItems="flex-start" key={index} sx={{ padding: '0', margin: '0' }}>
                  <ListItemIcon sx={{ minWidth: '30px', ml: item.endsWith(':') ? 0 : 2  }}>
                    {item.endsWith(':') ? <FaSquare color="#33AF4A" /> : <BsDot />}
                  </ListItemIcon>
                  <ListItemText primary={item.endsWith(':') ? item.slice(0, -1) : item} 
                      primaryTypographyProps={{ fontWeight: item.endsWith(':') ? 'bold' : 'normal' }} />
                </ListItem>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
    )}
    </>
  )
}

export default ProjectList