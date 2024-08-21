"use client"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaRegSave } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { getRecruitById, saveRecruit, updateRecruit } from "../_server/FormRecruitmentAction"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next-nprogress-bar"
import { DialogService } from "@lib/DialogService"
import { toast } from "react-toastify"

const schema = z.object({
  deadline: z.string().nullable(),
  quantity: z.string().min(4),
  title: z.string().min(4),
  work_time: z.string().min(4),
  gender: z.string().min(2),
  work_form: z.string().min(4),
  education: z.string().min(4),
  work_place: z.string().min(4),
  experience: z.string().min(4),
  salary: z.string().min(4),
  job_description: z.string().min(4),
  requirement: z.string().min(4),
  benefit: z.string().min(4),
  document: z.string().min(4),
  contact: z.string().min(4),
  language: z.string().min(2),
});

const FormRecruitment = ({ params }: { params: { id: string|null, language: string|null } }) => {
  const { register, watch, reset, control, trigger, getValues, setValue, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const [language, setLanguage] = useState(params.language ?? 'en');
  const router = useRouter();

  const getDataById = async (param : any) =>{
    setValue('language', param.language ?? 'en');
    if(params.id) {
      setValue("id_recruitment", params.id);
      let rs = await getRecruitById(param);
      if(rs){
        for (const [key, value] of Object.entries(rs)) {
          setValue(key, value);
        }
      }else{
        reset();
        setValue("id_recruitment", params.id);
      };
    }
  }

  useEffect(() => {
    getDataById(params);
  }, []);


  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveRecruit(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          router.push('/user/recruitment');
        });
      }
    });
  }

  const handleUpdate = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await updateRecruit(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          router.push('/user/recruitment');
        });
      }
    });
  }

  const handleLanguage = (e: any) => {
    const newAlignment = e.target.value;
    if (newAlignment == language) return;
    DialogService.confirm("Do you want to change langue?", async () => {
      setValue('language', newAlignment);
      setLanguage(newAlignment);
      let param = {
        id: params.id,
        language: newAlignment
      }
      getDataById(param);
      toast.success('Change language success');
    });
  }

  return (
    <>
      <Box component="form">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Link href="/user/recruitment"><Button variant="outlined" color="secondary" startIcon={<FaArrowLeft />}>Back</Button></Link>
            {!params.id && <Button onClick={handleSave} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>}
            {params.id && <Button onClick={handleUpdate} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Update</Button>}
          </Box>
          <Box className="text-end">
            <ToggleButtonGroup
              color="warning"
              exclusive
              value={language}
              aria-label="text alignment"
              {...register('language')}
              onClick={handleLanguage}
            >
              <ToggleButton value="en" aria-label="left aligned">En</ToggleButton>
              <ToggleButton value="vi" aria-label="left aligned">Vi</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box display="flex" gap="10px" className="mb-2">
            <Controller
              name="deadline"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label="Complete Time"
                  className="w-44 mb-2"
                  slotProps={{ 
                    textField: { 
                      size: 'small',
                      error: Boolean(errors.deadline) 
                    } 
                  }}
                  value={value ? new Date(value) : null}
                  onChange={(date) => onChange(date ? date.toISOString() : null)}
                />
              )}
            />
            <Box display="flex" flexDirection="column">
              <TextField InputLabelProps={{ shrink: !!watch('quantity') }} error={Boolean(errors.quantity)} {...register('quantity')} label="Quantity" variant="outlined" size="small"/>
              {/* @ts-ignore */}
              {errors.quantity && <Typography variant="caption" color={'red'}>{errors.quantity?.message}</Typography>}
            </Box>
            <Box display="flex" flexDirection="column">
              <TextField InputLabelProps={{ shrink: !!watch('sort') }} error={Boolean(errors.sort)} {...register('sort')} label="Sort" variant="outlined" size="small"/>
              {/* @ts-ignore */}
              {errors.sort && <Typography variant="caption" color={'red'}>{errors.sort?.message}</Typography>}
            </Box>
          </Box>
          <Typography variant="h6" className="mb-2">Main Description</Typography>

          <Grid container spacing={2} className="mb-2">
            <Grid xs={5}>
              <TextField InputLabelProps={{ shrink: !!watch('title') }} error={Boolean(errors.title)} {...register('title')} label="Occupation" variant="outlined" size="small" className="w-full"/>
              {/* @ts-ignore */}
              {errors.title && <Typography variant="caption" color={'red'}>{errors.title?.message}</Typography>}
            </Grid>
            <Grid xs={5}>
              <TextField InputLabelProps={{ shrink: !!watch('work_time') }} error={Boolean(errors.work_time)} {...register('work_time')} label="Working time" variant="outlined" size="small" className="w-full"/>
              {/* @ts-ignore */}
              {errors.work_time && <Typography variant="caption" color={'red'}>{errors.work_time?.message}</Typography>}
            </Grid>
            <Grid xs={5}>
            <FormControl fullWidth size="small">
              <InputLabel id="gender">Gender</InputLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select 
                    {...field}
                    error={Boolean(errors.gender)}
                    labelId="gender" 
                    label="gender"
                  >
                    <MenuItem></MenuItem>
                    {language === 'en' && <MenuItem value='Male'>Male</MenuItem>}
                    {language === 'en' && <MenuItem value='Female'>Female</MenuItem>}
                    {language === 'vi' && <MenuItem value='Nam'>Nam</MenuItem>}
                    {language === 'vi' && <MenuItem value='Nữ'>Nữ</MenuItem>}
                  </Select>
                )}
              />
              {/* @ts-ignore */}
              {errors.gender && <Typography variant="caption" color={'red'}>{errors.gender?.message}</Typography>}
            </FormControl>
            </Grid>
            <Grid xs={5}>
              <TextField InputLabelProps={{ shrink: !!watch('work_form') }} error={Boolean(errors.work_form)} {...register('work_form')} label="Working form" variant="outlined" size="small" className="w-full"/>
              {/* @ts-ignore */}
              {errors.work_form && <Typography variant="caption" color={'red'}>{errors.work_form?.message}</Typography>}
            </Grid>
            <Grid xs={5}>
              <TextField InputLabelProps={{ shrink: !!watch('education') }} error={Boolean(errors.education)} {...register('education')} label="Education" variant="outlined" size="small" className="w-full"/>
              {/* @ts-ignore */}
              {errors.education && <Typography variant="caption" color={'red'}>{errors.education?.message}</Typography>}
            </Grid>
            <Grid xs={5}>
              <TextField InputLabelProps={{ shrink: !!watch('work_place') }} error={Boolean(errors.work_place)} {...register('work_place')} label="Working place" variant="outlined" size="small" className="w-full"/>
              {/* @ts-ignore */}
              {errors.work_place && <Typography variant="caption" color={'red'}>{errors.work_place?.message}</Typography>}
            </Grid>
            <Grid xs={5}>
              <TextField InputLabelProps={{ shrink: !!watch('experience') }} error={Boolean(errors.experience)} {...register('experience')} label="Experience" variant="outlined" size="small" className="w-full"/>
              {/* @ts-ignore */}
              {errors.experience && <Typography variant="caption" color={'red'}>{errors.experience?.message}</Typography>}
            </Grid>
            <Grid xs={5}>
              <TextField InputLabelProps={{ shrink: !!watch('salary') }} error={Boolean(errors.salary)} {...register('salary')} label="Salary" variant="outlined" size="small" className="w-full"/>
              {/* @ts-ignore */}
              {errors.salary && <Typography variant="caption" color={'red'}>{errors.salary?.message}</Typography>}
            </Grid>
          </Grid>

          <Typography variant="h6">Job description</Typography>
          <TextField InputLabelProps={{ shrink: !!watch('job_description') }} error={Boolean(errors.job_description)} {...register('job_description')} label="Job description" variant="outlined" size="small" className="w-full" multiline />
          {/* @ts-ignore */}
          {errors.job_description && <Typography variant="caption" color={'red'}>{errors.job_description?.message}</Typography>}

          <Typography variant="h6">Requirement</Typography>
          <TextField InputLabelProps={{ shrink: !!watch('requirement') }} error={Boolean(errors.requirement)} {...register('requirement')} label="Requirement" variant="outlined" size="small" className="w-full" multiline />
          {/* @ts-ignore */}
          {errors.requirement && <Typography variant="caption" color={'red'}>{errors.requirement?.message}</Typography>}

          <Typography variant="h6">Benefits</Typography>
          <TextField InputLabelProps={{ shrink: !!watch('benefit') }} error={Boolean(errors.benefit)} {...register('benefit')} label="Benefits" variant="outlined" size="small" className="w-full" multiline />
          {/* @ts-ignore */}
          {errors.benefit && <Typography variant="caption" color={'red'}>{errors.benefit?.message}</Typography>}
          
          <Typography variant="h6">Documents</Typography>
          <TextField InputLabelProps={{ shrink: !!watch('document') }} error={Boolean(errors.document)} {...register('document')} label="Documents" variant="outlined" size="small" className="w-full" multiline />
          {/* @ts-ignore */}
          {errors.document && <Typography variant="caption" color={'red'}>{errors.document?.message}</Typography>}

          <Typography variant="h6">Contact Information</Typography>
          <TextField InputLabelProps={{ shrink: !!watch('contact') }} error={Boolean(errors.contact)} {...register('contact')} label="Contact Information" variant="outlined" size="small" className="w-full" multiline />
          {/* @ts-ignore */}
          {errors.contact && <Typography variant="caption" color={'red'}>{errors.contact?.message}</Typography>}

        </LocalizationProvider>
      </Box>
    </>
  )
}

export default FormRecruitment