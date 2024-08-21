"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonService } from "@lib/CommonService";
import { DialogService } from "@lib/DialogService";
import { Box, Button, Card, CardMedia, Tab, Tabs, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";
import { getEmpl, saveEmplCeo, saveEmplCoreManager, saveEmplManager, saveEmplSiteManager } from "../_server/FormEmployAction";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TableEmpl = () => {
  const [tab, setTab] = React.useState(0);

  const schema = z.object({
    ceo_name1: z.string().min(4, 'User Name must be at least 3 characters'),
    ceo_image1: z.string().min(4, 'User Name must be at least 3 characters'),
    ceo_title1: z.string().min(4, 'User Name must be at least 3 characters'),
    ceo_tdesc1: z.string().min(4, 'User Name must be at least 3 characters'),
    ceo_desc1: z.string().min(4, 'User Name must be at least 3 characters'),

    ceo_name2: z.string().min(4, 'User Name must be at least 3 characters'),
    ceo_image2: z.string().min(4, 'User Name must be at least 3 characters'),
    ceo_title2: z.string().min(4, 'User Name must be at least 3 characters'),
    ceo_tdesc2: z.string().min(4, 'User Name must be at least 3 characters'),
    ceo_desc2: z.string().min(4, 'User Name must be at least 3 characters'),

    cm_name1: z.string().min(4, 'User Name must be at least 4 characters'),
    cm_image1: z.string().min(4, 'User Name must be at least 4 characters'),
    cm_title1: z.string().min(4, 'User Name must be at least 4 characters'),
    cm_desc1: z.string().min(4, 'User Name must be at least 4 characters'),

    cm_name2: z.string().min(4, 'User Name must be at least 3 characters'),
    cm_image2: z.string().min(4, 'User Name must be at least 3 characters'),
    cm_title2: z.string().min(4, 'User Name must be at least 3 characters'),
    cm_desc2: z.string().min(4, 'User Name must be at least 3 characters'),

    m_name1: z.string().min(4, 'User Name must be at least 4 characters'),
    m_image1: z.string().min(4, 'User Name must be at least 4 characters'),
    m_title1: z.string().min(4, 'User Name must be at least 4 characters'),
    m_desc1: z.string().min(4, 'User Name must be at least 4 characters'),

    m_name2: z.string().min(4, 'User Name must be at least 3 characters'),
    m_image2: z.string().min(4, 'User Name must be at least 3 characters'),
    m_title2: z.string().min(4, 'User Name must be at least 3 characters'),
    m_desc2: z.string().min(4, 'User Name must be at least 3 characters'),

    m_name3: z.string().min(4, 'User Name must be at least 4 characters'),
    m_image3: z.string().min(4, 'User Name must be at least 4 characters'),
    m_title3: z.string().min(4, 'User Name must be at least 4 characters'),
    m_desc3: z.string().min(4, 'User Name must be at least 4 characters'),

    sm_name1: z.string().min(4, 'User Name must be at least 4 characters'),
    sm_image1: z.string().min(4, 'User Name must be at least 4 characters'),
    sm_title1: z.string().min(4, 'User Name must be at least 4 characters'),
    sm_desc1: z.string().min(4, 'User Name must be at least 4 characters'),

    sm_name2: z.string().min(4, 'User Name must be at least 3 characters'),
    sm_image2: z.string().min(4, 'User Name must be at least 3 characters'),
    sm_title2: z.string().min(4, 'User Name must be at least 3 characters'),
    sm_desc2: z.string().min(4, 'User Name must be at least 3 characters'),

    sm_name3: z.string().min(4, 'User Name must be at least 4 characters'),
    sm_image3: z.string().min(4, 'User Name must be at least 4 characters'),
    sm_title3: z.string().min(4, 'User Name must be at least 4 characters'),
    sm_desc3: z.string().min(4, 'User Name must be at least 4 characters'),

    sm_name4: z.string().min(4, 'User Name must be at least 4 characters'),
    sm_image4: z.string().min(4, 'User Name must be at least 4 characters'),
    sm_title4: z.string().min(4, 'User Name must be at least 4 characters'),
    sm_desc4: z.string().min(4, 'User Name must be at least 4 characters'),
  })

  const { reset, register, trigger, formState: { errors }, watch, setValue, getValues } = useForm({ resolver: zodResolver(schema) })
  const fileImg1 = useRef<HTMLInputElement>(null);
  const fileImg2 = useRef<HTMLInputElement>(null);
  const fileImg3 = useRef<HTMLInputElement>(null);
  const fileImg4 = useRef<HTMLInputElement>(null);
  const fileImg5 = useRef<HTMLInputElement>(null);
  const fileImg6 = useRef<HTMLInputElement>(null);
  const fileImg7 = useRef<HTMLInputElement>(null);
  const fileImg8 = useRef<HTMLInputElement>(null);
  const fileImg9 = useRef<HTMLInputElement>(null);
  const fileImg10 = useRef<HTMLInputElement>(null);
  const fileImg11 = useRef<HTMLInputElement>(null);
  const [imageSrc1, setImageSrc1] = useState<string | null>(null);
  const [imageSrc2, setImageSrc2] = useState<string | null>(null);
  const [imageSrc3, setImageSrc3] = useState<string | null>(null);
  const [imageSrc4, setImageSrc4] = useState<string | null>(null);
  const [imageSrc5, setImageSrc5] = useState<string | null>(null);
  const [imageSrc6, setImageSrc6] = useState<string | null>(null);
  const [imageSrc7, setImageSrc7] = useState<string | null>(null);
  const [imageSrc8, setImageSrc8] = useState<string | null>(null);
  const [imageSrc9, setImageSrc9] = useState<string | null>(null);
  const [imageSrc10, setImageSrc10] = useState<string | null>(null);
  const [imageSrc11, setImageSrc11] = useState<string | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleUploadClick1 = (event:any) => {
    fileImg1.current?.click();
  };
  const handleUploadClick2 = (event:any) => {
    fileImg2.current?.click();
  };
  const handleUploadClick3 = (event:any) => {
    fileImg3.current?.click();
  };
  const handleUploadClick4 = (event:any) => {
    fileImg4.current?.click();
  };
  const handleUploadClick5 = (event:any) => {
    fileImg5.current?.click();
  };
  const handleUploadClick6 = (event:any) => {
    fileImg6.current?.click();
  };
  const handleUploadClick7 = (event:any) => {
    fileImg7.current?.click();
  };
  const handleUploadClick8 = (event:any) => {
    fileImg8.current?.click();
  };
  const handleUploadClick9 = (event:any) => {
    fileImg9.current?.click();
  };
  const handleUploadClick10 = (event:any) => {
    fileImg10.current?.click();
  };
  const handleUploadClick11 = (event:any) => {
    fileImg11.current?.click();
  };

  const handleFileChange1 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc1(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('ceo_image1', b64File);
  };
  const handleFileChange2 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc2(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('ceo_image2', b64File);
  };
  const handleFileChange3 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc3(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('cm_image1', b64File);
  };
  const handleFileChange4 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc4(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('cm_image2', b64File);
  };
  const handleFileChange5 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc5(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('m_image1', b64File);
  };
  const handleFileChange6 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc6(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('m_image2', b64File);
  };
  const handleFileChange7 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc7(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('m_image3', b64File);
  };
  const handleFileChange8 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc8(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('sm_image1', b64File);
  };
  const handleFileChange9 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc9(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('sm_image2', b64File);
  };
  const handleFileChange10 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc10(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('sm_image3', b64File);
  };
  const handleFileChange11 = async (event:any) => {
    const file = event.target.files[0];
    if(!file) return;
    setImageSrc11(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('sm_image4', b64File);
  };


  const handleSaveCeo = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveEmplCeo(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {});
      }
    });
  }

  const handleSaveCoreManager = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveEmplCoreManager(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {});
      }
    });
  }

  const handleSaveManager = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveEmplManager(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {});
      }
    });
  }
  const handleSaveSiteManager = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveEmplSiteManager(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {});
      }
    });
  }

  const getData = async () => {
    let rs = await getEmpl();
    if(rs){
      for (const [key, value] of Object.entries(rs)) {
        setValue(key, value);
      }
      setImageSrc1(rs.ceo_image1);
      setImageSrc2(rs.ceo_image2);
      setImageSrc3(rs.cm_image1);
      setImageSrc4(rs.cm_image2);
      setImageSrc5(rs.m_image1);
      setImageSrc6(rs.m_image2);
      setImageSrc7(rs.m_image3);
      setImageSrc8(rs.sm_image1);
      setImageSrc9(rs.sm_image2);
      setImageSrc10(rs.sm_image3);
      setImageSrc11(rs.sm_image4);
    }
  }

  useEffect(() => {
    getData();
    reset();
  }, [tab]);

  return (
    <>
      <Box sx={{ width: '100%'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="CEO" {...a11yProps(0)} />
            <Tab label="Core Managers" {...a11yProps(1)} />
            <Tab label="Manager" {...a11yProps(2)} />
            <Tab label="Site Manager" {...a11yProps(3)} />
          </Tabs>
        </Box>
        {/* CEO */}
        <CustomTabPanel value={tab} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
            <Button onClick={handleSaveCeo} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>
          </Box>
          <Grid container spacing={10}>
            <Grid md={6}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('ceo_image1')} ref={fileImg1} style={{ display: 'none' }} onChange={handleFileChange1} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick1}>
                  Upload
                </Button>
                { imageSrc1 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc1} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.ceo_name1)} InputLabelProps={{ shrink: !!watch('ceo_name1') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('ceo_name1')}/>
                {/* @ts-ignore */}
                {errors.ceo_name1 && <Typography variant="caption" color={'red'}>{errors.ceo_name1.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.ceo_title1)} InputLabelProps={{ shrink: !!watch('ceo_title1') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('ceo_title1')}/>
                {/* @ts-ignore */}
                {errors.ceo_title1 && <Typography variant="caption" color={'red'}>{errors.ceo_title1.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.ceo_tdesc1)} InputLabelProps={{ shrink: !!watch('ceo_tdesc1') }} required fullWidth variant="outlined" size="small" label="Title Description" autoFocus {...register('ceo_tdesc1')}/>
                {/* @ts-ignore */}
                {errors.ceo_tdesc1 && <Typography variant="caption" color={'red'}>{errors.ceo_tdesc1.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.ceo_desc1)} InputLabelProps={{ shrink: !!watch('ceo_desc1') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('ceo_desc1')}/>
                {/* @ts-ignore */}
                {errors.ceo_desc1 && <Typography variant="caption" color={'red'}>{errors.ceo_desc1.message}</Typography>}
              </Box>
            </Grid>
            <Grid md={6}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('ceo_image2')} ref={fileImg2} style={{ display: 'none' }} onChange={handleFileChange2} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick2}>
                  Upload
                </Button>
                { imageSrc2 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc2} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.ceo_name2)} InputLabelProps={{ shrink: !!watch('ceo_name2') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('ceo_name2')}/>
                {/* @ts-ignore */}
                {errors.ceo_name2 && <Typography variant="caption" color={'red'}>{errors.ceo_name2.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.ceo_title2)} InputLabelProps={{ shrink: !!watch('ceo_title2') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('ceo_title2')}/>
                {/* @ts-ignore */}
                {errors.ceo_title2 && <Typography variant="caption" color={'red'}>{errors.ceo_title2.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.ceo_tdesc2)} InputLabelProps={{ shrink: !!watch('ceo_tdesc2') }} required fullWidth variant="outlined" size="small" label="Title Description" autoFocus {...register('ceo_tdesc2')}/>
                {/* @ts-ignore */}
                {errors.ceo_tdesc2 && <Typography variant="caption" color={'red'}>{errors.ceo_tdesc2.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.ceo_desc2)} InputLabelProps={{ shrink: !!watch('ceo_desc2') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('ceo_desc2')}/>
                {/* @ts-ignore */}
                {errors.ceo_desc2 && <Typography variant="caption" color={'red'}>{errors.ceo_desc2.message}</Typography>}
              </Box>
            </Grid>
          </Grid>
        </CustomTabPanel>

        
        {/* CORE MANGER */}
        <CustomTabPanel value={tab} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
            <Button onClick={handleSaveCoreManager} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>
          </Box>
          <Grid container spacing={10}>
            <Grid md={6}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('cm_image1')} ref={fileImg3} style={{ display: 'none' }} onChange={handleFileChange3} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick3}>
                  Upload
                </Button>
                { imageSrc3 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc3} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.cm_name1)} InputLabelProps={{ shrink: !!watch('cm_name1') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('cm_name1')}/>
                {/* @ts-ignore */}
                {errors.cm_name1 && <Typography variant="caption" color={'red'}>{errors.cm_name1.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.cm_title1)} InputLabelProps={{ shrink: !!watch('cm_title1') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('cm_title1')}/>
                {/* @ts-ignore */}
                {errors.cm_title1 && <Typography variant="caption" color={'red'}>{errors.cm_title1.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.cm_desc1)} InputLabelProps={{ shrink: !!watch('cm_desc1') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('cm_desc1')}/>
                {/* @ts-ignore */}
                {errors.cm_desc1 && <Typography variant="caption" color={'red'}>{errors.cm_desc1.message}</Typography>}
              </Box>
            </Grid>
            <Grid md={6}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('cm_image2')} ref={fileImg4} style={{ display: 'none' }} onChange={handleFileChange4} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick4}>
                  Upload
                </Button>
                { imageSrc4 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc4} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.cm_name2)} InputLabelProps={{ shrink: !!watch('cm_name2') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('cm_name2')}/>
                {/* @ts-ignore */}
                {errors.cm_name2 && <Typography variant="caption" color={'red'}>{errors.cm_name2.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.cm_title2)} InputLabelProps={{ shrink: !!watch('cm_title2') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('cm_title2')}/>
                {/* @ts-ignore */}
                {errors.cm_title2 && <Typography variant="caption" color={'red'}>{errors.cm_title2.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.cm_desc2)} InputLabelProps={{ shrink: !!watch('cm_desc2') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('cm_desc2')}/>
                {/* @ts-ignore */}
                {errors.cm_desc2 && <Typography variant="caption" color={'red'}>{errors.cm_desc2.message}</Typography>}
              </Box>
            </Grid>
          </Grid>
        </CustomTabPanel>

        {/* MANAGER */}
        <CustomTabPanel value={tab} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
            <Button onClick={handleSaveManager} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>
          </Box>
          <Grid container spacing={10}>
            <Grid md={4}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('m_image1')} ref={fileImg5} style={{ display: 'none' }} onChange={handleFileChange5} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick5}>
                  Upload
                </Button>
                { imageSrc5 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc5} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.m_name1)} InputLabelProps={{ shrink: !!watch('m_name1') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('m_name1')}/>
                {/* @ts-ignore */}
                {errors.m_name1 && <Typography variant="caption" color={'red'}>{errors.m_name1.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.m_title1)} InputLabelProps={{ shrink: !!watch('m_title1') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('m_title1')}/>
                {/* @ts-ignore */}
                {errors.m_title1 && <Typography variant="caption" color={'red'}>{errors.m_title1.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.m_desc1)} InputLabelProps={{ shrink: !!watch('m_desc1') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('m_desc1')}/>
                {/* @ts-ignore */}
                {errors.m_desc1 && <Typography variant="caption" color={'red'}>{errors.m_desc1.message}</Typography>}
              </Box>
            </Grid>
            <Grid md={4}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('m_image2')} ref={fileImg6} style={{ display: 'none' }} onChange={handleFileChange6} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick6}>
                  Upload
                </Button>
                { imageSrc6 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc6} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.m_name2)} InputLabelProps={{ shrink: !!watch('m_name2') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('m_name2')}/>
                {/* @ts-ignore */}
                {errors.m_name2 && <Typography variant="caption" color={'red'}>{errors.m_name2.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.m_title2)} InputLabelProps={{ shrink: !!watch('m_title2') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('m_title2')}/>
                {/* @ts-ignore */}
                {errors.m_title2 && <Typography variant="caption" color={'red'}>{errors.m_title2.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.m_desc2)} InputLabelProps={{ shrink: !!watch('m_desc2') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('m_desc2')}/>
                {/* @ts-ignore */}
                {errors.m_desc2 && <Typography variant="caption" color={'red'}>{errors.m_desc2.message}</Typography>}
              </Box>
            </Grid>
            <Grid md={4}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('m_image3')} ref={fileImg7} style={{ display: 'none' }} onChange={handleFileChange7} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick7}>
                  Upload
                </Button>
                { imageSrc7 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc7} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.m_name3)} InputLabelProps={{ shrink: !!watch('m_name3') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('m_name3')}/>
                {/* @ts-ignore */}
                {errors.m_name3 && <Typography variant="caption" color={'red'}>{errors.m_name3.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.m_title3)} InputLabelProps={{ shrink: !!watch('m_title3') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('m_title3')}/>
                {/* @ts-ignore */}
                {errors.m_title3 && <Typography variant="caption" color={'red'}>{errors.m_title3.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.m_desc3)} InputLabelProps={{ shrink: !!watch('m_desc3') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('m_desc3')}/>
                {/* @ts-ignore */}
                {errors.m_desc3 && <Typography variant="caption" color={'red'}>{errors.m_desc3.message}</Typography>}
              </Box>
            </Grid>
          </Grid>
        </CustomTabPanel>

        {/* Site Manager */}
        <CustomTabPanel value={tab} index={3}>
        <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
            <Button onClick={handleSaveSiteManager} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>
          </Box>
          <Grid container spacing={10}>
            <Grid md={3}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('sm_image1')} ref={fileImg8} style={{ display: 'none' }} onChange={handleFileChange8} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick8}>
                  Upload
                </Button>
                { imageSrc8 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc8} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_name1)} InputLabelProps={{ shrink: !!watch('sm_name1') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('sm_name1')}/>
                {/* @ts-ignore */}
                {errors.sm_name1 && <Typography variant="caption" color={'red'}>{errors.sm_name1.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_title1)} InputLabelProps={{ shrink: !!watch('sm_title1') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('sm_title1')}/>
                {/* @ts-ignore */}
                {errors.sm_title1 && <Typography variant="caption" color={'red'}>{errors.sm_title1.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_desc1)} InputLabelProps={{ shrink: !!watch('sm_desc1') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('sm_desc1')}/>
                {/* @ts-ignore */}
                {errors.sm_desc1 && <Typography variant="caption" color={'red'}>{errors.sm_desc1.message}</Typography>}
              </Box>
            </Grid>
            <Grid md={3}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('sm_image2')} ref={fileImg9} style={{ display: 'none' }} onChange={handleFileChange9} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick9}>
                  Upload
                </Button>
                { imageSrc9 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc9} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_name2)} InputLabelProps={{ shrink: !!watch('sm_name2') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('sm_name2')}/>
                {/* @ts-ignore */}
                {errors.sm_name2 && <Typography variant="caption" color={'red'}>{errors.sm_name2.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_title2)} InputLabelProps={{ shrink: !!watch('sm_title2') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('sm_title2')}/>
                {/* @ts-ignore */}
                {errors.sm_title2 && <Typography variant="caption" color={'red'}>{errors.sm_title2.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_desc2)} InputLabelProps={{ shrink: !!watch('sm_desc2') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('sm_desc2')}/>
                {/* @ts-ignore */}
                {errors.sm_desc2 && <Typography variant="caption" color={'red'}>{errors.sm_desc2.message}</Typography>}
              </Box>
            </Grid>
            <Grid md={3}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('sm_image3')} ref={fileImg10} style={{ display: 'none' }} onChange={handleFileChange10} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick10}>
                  Upload
                </Button>
                { imageSrc10 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc10} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_name3)} InputLabelProps={{ shrink: !!watch('sm_name3') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('sm_name3')}/>
                {/* @ts-ignore */}
                {errors.sm_name3 && <Typography variant="caption" color={'red'}>{errors.sm_name3.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_title3)} InputLabelProps={{ shrink: !!watch('sm_title3') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('sm_title3')}/>
                {/* @ts-ignore */}
                {errors.sm_title3 && <Typography variant="caption" color={'red'}>{errors.sm_title3.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_desc3)} InputLabelProps={{ shrink: !!watch('sm_desc3') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('sm_desc3')}/>
                {/* @ts-ignore */}
                {errors.sm_desc3 && <Typography variant="caption" color={'red'}>{errors.sm_desc3.message}</Typography>}
              </Box>
            </Grid>
            <Grid md={3}>
              <Box className="w-40 mb-4">
                <input type="file" {...register('sm_image4')} ref={fileImg11} style={{ display: 'none' }} onChange={handleFileChange11} />
                <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick11}>
                  Upload
                </Button>
                { imageSrc11 && 
                  <Card><CardMedia component="img" height="20" image={imageSrc11} alt="Preview"/></Card>
                }
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_name4)} InputLabelProps={{ shrink: !!watch('sm_name4') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('sm_name4')}/>
                {/* @ts-ignore */}
                {errors.sm_name4 && <Typography variant="caption" color={'red'}>{errors.sm_name4.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_title4)} InputLabelProps={{ shrink: !!watch('sm_title4') }} required fullWidth variant="outlined" size="small" label="Title" autoFocus {...register('sm_title4')}/>
                {/* @ts-ignore */}
                {errors.sm_title4 && <Typography variant="caption" color={'red'}>{errors.sm_title4.message}</Typography>}
              </Box>
              <Box className="mb-4">
                <TextField error={Boolean(errors.sm_desc4)} InputLabelProps={{ shrink: !!watch('sm_desc4') }} required fullWidth variant="outlined" size="small" label="Description" autoFocus {...register('sm_desc4')}/>
                {/* @ts-ignore */}
                {errors.sm_desc4 && <Typography variant="caption" color={'red'}>{errors.sm_desc4.message}</Typography>}
              </Box>
            </Grid>
          </Grid>
        </CustomTabPanel>

      </Box>
    </>
  )
}

export default TableEmpl