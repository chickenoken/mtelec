"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonService } from '@lib/CommonService';
import { DialogService } from '@lib/DialogService';
import { Box, Button, Card, CardMedia, Divider, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaRegSave } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { z } from 'zod';
import { getPAbout, savePAbout } from '../server/FormAboutAction';

const FormAbout = () => {
  const fileImg1 = useRef<HTMLInputElement>(null);
  const fileImg2 = useRef<HTMLInputElement>(null);
  const [imageSrc1, setImageSrc1] = useState<string | null>(null);
  const [imageSrc2, setImageSrc2] = useState<string | null>(null);

  const fileVal1 = useRef<HTMLInputElement>(null);
  const fileVal2 = useRef<HTMLInputElement>(null);
  const fileVal3 = useRef<HTMLInputElement>(null);
  const [valSrc1, setValSrc1] = useState<string | null>(null);
  const [valSrc2, setValSrc2] = useState<string | null>(null);
  const [valSrc3, setValSrc3] = useState<string | null>(null);

  const fileIcon1 = useRef<HTMLInputElement>(null);
  const fileIcon2 = useRef<HTMLInputElement>(null);
  const fileIcon3 = useRef<HTMLInputElement>(null);
  const [iconSrc1, setIconSrc1] = useState<string | null>(null);
  const [iconSrc2, setIconSrc2] = useState<string | null>(null);
  const [iconSrc3, setIconSrc3] = useState<string | null>(null);

  const fileCore1 = useRef<HTMLInputElement>(null);
  const fileCore2 = useRef<HTMLInputElement>(null);
  const fileCore3 = useRef<HTMLInputElement>(null);
  const fileCore4 = useRef<HTMLInputElement>(null);
  const [coreSrc1, setCoreSrc1] = useState<string | null>(null);
  const [coreSrc2, setCoreSrc2] = useState<string | null>(null);
  const [coreSrc3, setCoreSrc3] = useState<string | null>(null);
  const [coreSrc4, setCoreSrc4] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<any>({});

  const handleFileChange = async (event: any, imageSetter :any, fieldName: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const b64File = await CommonService.convertToBase64(file);
    setValue(fieldName, b64File);
    imageSetter(URL.createObjectURL(file));
  };

  const handleUploadClick = (fileInputRef: any) => {
    fileInputRef.current?.click();
  };

  const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    desc: z.string().min(1, 'Description is required'),
    image1: z.string().min(1, 'Image URL is required'),
    image2: z.string().min(1, 'Image URL is required'),
    team_title: z.string().min(1, 'Team title is required'),
    team_content: z.string().min(1, 'Team content is required'),
    icon1: z.string().min(1, 'Icon URL is required'),
    icon_name1: z.string().min(1, 'Icon name is required'),
    icon_desc1: z.string().min(1, 'Icon description is required'),
    icon2: z.string().min(1, 'Icon URL is required'),
    icon_name2: z.string().min(1, 'Icon name is required'),
    icon_desc2: z.string().min(1, 'Icon description is required'),
    icon3: z.string().min(1, 'Icon URL is required'),
    icon_name3: z.string().min(1, 'Icon name is required'),
    icon_desc3: z.string().min(1, 'Icon description is required'),
    vision: z.string().min(1, 'Vision statement is required'),
    val1: z.string().min(1, 'Value is required'),
    val_title1: z.string().min(1, 'Value title is required'),
    val_desc1: z.string().min(1, 'Value description is required'),
    val2: z.string().min(1, 'Value is required'),
    val_title2: z.string().min(1, 'Value title is required'),
    val_desc2: z.string().min(1, 'Value description is required'),
    val3: z.string().min(1, 'Value is required'),
    val_title3: z.string().min(1, 'Value title is required'),
    val_desc3: z.string().min(1, 'Value description is required'),
    core1: z.string().min(1, 'Core value is required'),
    core_title1: z.string().min(1, 'Core value title is required'),
    core_desc1: z.string().min(1, 'Core value description is required'),
    core2: z.string().min(1, 'Core value is required'),
    core_title2: z.string().min(1, 'Core value title is required'),
    core_desc2: z.string().min(1, 'Core value description is required'),
    core3: z.string().min(1, 'Core value is required'),
    core_title3: z.string().min(1, 'Core value title is required'),
    core_desc3: z.string().min(1, 'Core value description is required'),
    core4: z.string().min(1, 'Core value is required'),
    core_title4: z.string().min(1, 'Core value title is required'),
    core_desc4: z.string().min(1, 'Core value description is required'),
  });
  const { register, getValues, trigger, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      if(param.image1 === originalData.image1) param.image1 = '';
      if(param.image2 === originalData.image2) param.image2 = '';
      if(param.icon1 === originalData.icon1) param.icon1 = '';
      if(param.icon2 === originalData.icon2) param.icon2 = '';
			if(param.icon3 === originalData.icon3) param.icon3 = '';
      if(param.val1 === originalData.val1) param.val1 = '';
      if(param.val2 === originalData.val2) param.val2 = '';
      if(param.val3 === originalData.val3) param.val3 = '';
			if(param.core1 === originalData.core1) param.core1 = '';
      if(param.core2 === originalData.core2) param.core2 = '';
      if(param.core3 === originalData.core3) param.core3 = '';
      if(param.core4 === originalData.core4) param.core4 = '';

      let re = await savePAbout(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {});
      }
    });
  }

  const getData = async () => {
    let rs = await getPAbout();
    if(rs){
      for (const [key, value] of Object.entries(rs)) {
        setValue(key, value);
      }
      setImageSrc1(rs.image1);
      setImageSrc2(rs.image2);
      setValSrc1(rs.val1);
      setValSrc2(rs.val2);
      setValSrc3(rs.val3);
      setIconSrc1(rs.icon1);
      setIconSrc2(rs.icon2);
      setIconSrc3(rs.icon3);
      setCoreSrc1(rs.core1);
      setCoreSrc2(rs.core2);
      setCoreSrc3(rs.core3);
      setCoreSrc4(rs.core4);
      setOriginalData(rs);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
        <Button onClick={handleSave} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>
      </Box>
      <Typography  variant="h6" className='mb-2'>Our Company</Typography>

      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="mb-2">
            <TextField error={Boolean(errors.title)} InputLabelProps={{ shrink: !!watch('title') }} required fullWidth variant="outlined" size="small" label="title" autoFocus {...register('title')}/>
            {/* @ts-ignore */}
            {errors.title && <Typography variant="caption" color={'red'}>{errors.title.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.content)} InputLabelProps={{ shrink: !!watch('content') }} required fullWidth multiline variant="outlined" size="small" label="content" autoFocus {...register('content')}/>
            {/* @ts-ignore */}
            {errors.content && <Typography variant="caption" color={'red'}>{errors.content.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.desc)} InputLabelProps={{ shrink: !!watch('desc') }} required fullWidth multiline variant="outlined" size="small" label="desc" autoFocus {...register('desc')}/>
            {/* @ts-ignore */}
            {errors.desc && <Typography variant="caption" color={'red'}>{errors.desc.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('image1')} ref={fileImg1} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setImageSrc1, 'image1')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileImg1)}>
              Upload
            </Button>
            { imageSrc1 && 
              <Card><CardMedia component="img" height="20" image={imageSrc1} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>
      <Divider className='my-4' />
      <Typography  variant="h6" className='mb-2'>Our Icon</Typography>
      <Grid container spacing={10}>
        <Grid md={4}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('icon1')} ref={fileIcon1} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setIconSrc1, 'icon1')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileIcon1)}>
              Upload
            </Button>
            { iconSrc1 && 
              <Card><CardMedia component="img" height="20" image={iconSrc1} alt="Preview"/></Card>
            }
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.icon_name1)} InputLabelProps={{ shrink: !!watch('icon_name1') }} required fullWidth multiline variant="outlined" size="small" label="icon_name" autoFocus {...register('icon_name1')}/>
            {/* @ts-ignore */}
            {errors.icon_name1 && <Typography variant="caption" color={'red'}>{errors.icon_name1.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.icon_desc1)} InputLabelProps={{ shrink: !!watch('icon_desc1') }} required fullWidth multiline variant="outlined" size="small" label="icon_desc" autoFocus {...register('icon_desc1')}/>
            {/* @ts-ignore */}
            {errors.icon_desc1 && <Typography variant="caption" color={'red'}>{errors.icon_desc1.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={4}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('icon2')} ref={fileIcon2} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setIconSrc2, 'icon2')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileIcon2)}>
              Upload
            </Button>
            { iconSrc2 && 
              <Card><CardMedia component="img" height="20" image={iconSrc2} alt="Preview"/></Card>
            }
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.icon_name2)} InputLabelProps={{ shrink: !!watch('icon_name2') }} required fullWidth multiline variant="outlined" size="small" label="icon_name" autoFocus {...register('icon_name2')}/>
            {/* @ts-ignore */}
            {errors.icon_name2 && <Typography variant="caption" color={'red'}>{errors.icon_name2.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.icon_desc2)} InputLabelProps={{ shrink: !!watch('icon_desc2') }} required fullWidth multiline variant="outlined" size="small" label="icon_desc" autoFocus {...register('icon_desc2')}/>
            {/* @ts-ignore */}
            {errors.icon_desc2 && <Typography variant="caption" color={'red'}>{errors.icon_desc2.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={4}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('icon3')} ref={fileIcon3} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setIconSrc3, 'icon3')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileIcon3)}>
              Upload
            </Button>
            { iconSrc3 && 
              <Card><CardMedia component="img" height="20" image={iconSrc3} alt="Preview"/></Card>
            }
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.icon_name3)} InputLabelProps={{ shrink: !!watch('icon_name3') }} required fullWidth multiline variant="outlined" size="small" label="icon_name" autoFocus {...register('icon_name3')}/>
            {/* @ts-ignore */}
            {errors.icon_name3 && <Typography variant="caption" color={'red'}>{errors.icon_name3.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.icon_desc3)} InputLabelProps={{ shrink: !!watch('icon_desc3') }} required fullWidth multiline variant="outlined" size="small" label="icon_desc" autoFocus {...register('icon_desc3')}/>
            {/* @ts-ignore */}
            {errors.icon_desc3 && <Typography variant="caption" color={'red'}>{errors.icon_desc3.message}</Typography>}
          </Box>
        </Grid>
      </Grid>
      <Divider className='my-4' />
      <Typography  variant="h6" className='mb-2'>Our Value</Typography>
      <Box className="mb-2">
        <TextField error={Boolean(errors.vision)} InputLabelProps={{ shrink: !!watch('vision') }} required fullWidth multiline variant="outlined" size="small" label="vision" autoFocus {...register('vision')}/>
        {/* @ts-ignore */}
        {errors.vision && <Typography variant="caption" color={'red'}>{errors.vision.message}</Typography>}
      </Box>
      <Typography  variant="h6" className='mb-2'>Mission</Typography>
      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="mb-2">
            <TextField error={Boolean(errors.val_title1)} InputLabelProps={{ shrink: !!watch('val_title1') }} required fullWidth multiline variant="outlined" size="small" label="title" autoFocus {...register('val_title1')}/>
            {/* @ts-ignore */}
            {errors.val_title1 && <Typography variant="caption" color={'red'}>{errors.val_title1.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.val_desc1)} InputLabelProps={{ shrink: !!watch('val_desc1') }} required fullWidth multiline variant="outlined" size="small" label="desc" autoFocus {...register('val_desc1')}/>
            {/* @ts-ignore */}
            {errors.val_desc1 && <Typography variant="caption" color={'red'}>{errors.val_desc1.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('val1')} ref={fileVal1} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setValSrc1, 'val1')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileVal1)}>
              Upload
            </Button>
            { valSrc1 && 
              <Card><CardMedia component="img" height="20" image={valSrc1} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="mb-2">
            <TextField error={Boolean(errors.val_title2)} InputLabelProps={{ shrink: !!watch('val_title2') }} required fullWidth multiline variant="outlined" size="small" label="title" autoFocus {...register('val_title2')}/>
            {/* @ts-ignore */}
            {errors.val_title2 && <Typography variant="caption" color={'red'}>{errors.val_title2.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.val_desc2)} InputLabelProps={{ shrink: !!watch('val_desc2') }} required fullWidth multiline variant="outlined" size="small" label="desc" autoFocus {...register('val_desc2')}/>
            {/* @ts-ignore */}
            {errors.val_desc2 && <Typography variant="caption" color={'red'}>{errors.val_desc2.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('val2')} ref={fileVal2} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setValSrc2, 'val2')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileVal2)}>
              Upload
            </Button>
            { valSrc2 && 
              <Card><CardMedia component="img" height="20" image={valSrc2} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="mb-2">
            <TextField error={Boolean(errors.val_title3)} InputLabelProps={{ shrink: !!watch('val_title3') }} required fullWidth multiline variant="outlined" size="small" label="title" autoFocus {...register('val_title3')}/>
            {/* @ts-ignore */}
            {errors.val_title3 && <Typography variant="caption" color={'red'}>{errors.val_title3.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.val_desc3)} InputLabelProps={{ shrink: !!watch('val_desc3') }} required fullWidth multiline variant="outlined" size="small" label="desc" autoFocus {...register('val_desc3')}/>
            {/* @ts-ignore */}
            {errors.val_desc3 && <Typography variant="caption" color={'red'}>{errors.val_desc3.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('val3')} ref={fileVal3} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setValSrc3, 'val3')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileVal3)}>
              Upload
            </Button>
            { valSrc3 && 
              <Card><CardMedia component="img" height="20" image={valSrc3} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>

      <Typography  variant="h6" className='mb-2'>Core Values</Typography>
      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="mb-2">
            <TextField error={Boolean(errors.core_title1)} InputLabelProps={{ shrink: !!watch('core_title1') }} required fullWidth multiline variant="outlined" size="small" label="title" autoFocus {...register('core_title1')}/>
            {/* @ts-ignore */}
            {errors.core_title1 && <Typography variant="caption" color={'red'}>{errors.core_title1.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.core_desc1)} InputLabelProps={{ shrink: !!watch('core_desc1') }} required fullWidth multiline variant="outlined" size="small" label="desc" autoFocus {...register('core_desc1')}/>
            {/* @ts-ignore */}
            {errors.core_desc1 && <Typography variant="caption" color={'red'}>{errors.core_desc1.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('core1')} ref={fileCore1} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setCoreSrc1, 'core1')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileCore1)}>
              Upload
            </Button>
            { coreSrc1 && 
              <Card><CardMedia component="img" height="20" image={coreSrc1} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="mb-2">
            <TextField error={Boolean(errors.core_title2)} InputLabelProps={{ shrink: !!watch('core_title2') }} required fullWidth multiline variant="outlined" size="small" label="title" autoFocus {...register('core_title2')}/>
            {/* @ts-ignore */}
            {errors.core_title2 && <Typography variant="caption" color={'red'}>{errors.core_title2.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.core_desc2)} InputLabelProps={{ shrink: !!watch('core_desc2') }} required fullWidth multiline variant="outlined" size="small" label="desc" autoFocus {...register('core_desc2')}/>
            {/* @ts-ignore */}
            {errors.core_desc2 && <Typography variant="caption" color={'red'}>{errors.core_desc2.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('core2')} ref={fileCore2} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setCoreSrc2, 'core2')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileCore2)}>
              Upload
            </Button>
            { coreSrc2 && 
              <Card><CardMedia component="img" height="20" image={coreSrc2} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="mb-2">
            <TextField error={Boolean(errors.core_title3)} InputLabelProps={{ shrink: !!watch('core_title3') }} required fullWidth multiline variant="outlined" size="small" label="title" autoFocus {...register('core_title3')}/>
            {/* @ts-ignore */}
            {errors.core_title3 && <Typography variant="caption" color={'red'}>{errors.core_title3.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.core_desc3)} InputLabelProps={{ shrink: !!watch('core_desc3') }} required fullWidth multiline variant="outlined" size="small" label="desc" autoFocus {...register('core_desc3')}/>
            {/* @ts-ignore */}
            {errors.core_desc3 && <Typography variant="caption" color={'red'}>{errors.core_desc3.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('core3')} ref={fileCore3} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setCoreSrc3, 'core3')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileCore3)}>
              Upload
            </Button>
            { coreSrc3 && 
              <Card><CardMedia component="img" height="20" image={coreSrc3} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="mb-2">
            <TextField error={Boolean(errors.core_title4)} InputLabelProps={{ shrink: !!watch('core_title4') }} required fullWidth multiline variant="outlined" size="small" label="title" autoFocus {...register('core_title4')}/>
            {/* @ts-ignore */}
            {errors.core_title4 && <Typography variant="caption" color={'red'}>{errors.core_title4.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.core_desc4)} InputLabelProps={{ shrink: !!watch('core_desc4') }} required fullWidth multiline variant="outlined" size="small" label="desc" autoFocus {...register('core_desc4')}/>
            {/* @ts-ignore */}
            {errors.core_desc4 && <Typography variant="caption" color={'red'}>{errors.core_desc4.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('core4')} ref={fileCore4} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setCoreSrc4, 'core4')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileCore4)}>
              Upload
            </Button>
            { coreSrc4 && 
              <Card><CardMedia component="img" height="20" image={coreSrc4} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>
      <Divider className='my-4' />
      <Typography  variant="h6" className='mb-2'>Our Team</Typography>

      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="mb-2">
            <TextField error={Boolean(errors.team_title)} InputLabelProps={{ shrink: !!watch('team_title') }} required fullWidth variant="outlined" size="small" label="title" autoFocus {...register('team_title')}/>
            {/* @ts-ignore */}
            {errors.team_title && <Typography variant="caption" color={'red'}>{errors.team_title.message}</Typography>}
          </Box>
          <Box className="mb-2">
            <TextField error={Boolean(errors.team_content)} InputLabelProps={{ shrink: !!watch('team_content') }} required fullWidth multiline variant="outlined" size="small" label="content" autoFocus {...register('team_content')}/>
            {/* @ts-ignore */}
            {errors.team_content && <Typography variant="caption" color={'red'}>{errors.team_content.message}</Typography>}
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('image2')} ref={fileImg2} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setImageSrc2, 'image2')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileImg2)}>
              Upload
            </Button>
            { imageSrc2 && 
              <Card><CardMedia component="img" height="20" image={imageSrc2} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default FormAbout