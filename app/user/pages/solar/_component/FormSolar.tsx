"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonService } from "@lib/CommonService";
import { DialogService } from "@lib/DialogService";
import { Box, Button, Card, CardMedia, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";
import TableWorkingFields from "../../../../../components/services/TableWorkingField";
import { IDataWithoutImg } from "../../automation/_component/FormAutomation";
import { getPSolar, savePSolar } from "../server/FormSolarAction";

const FormSolar = () => {
	const fileImg1 = useRef<HTMLInputElement>(null);
	const fileImg2 = useRef<HTMLInputElement>(null);
	const fileImg3 = useRef<HTMLInputElement>(null);
	const fileImg4 = useRef<HTMLInputElement>(null);
	const fileImg5 = useRef<HTMLInputElement>(null);
	const fileImg6 = useRef<HTMLInputElement>(null);
	const fileImg7 = useRef<HTMLInputElement>(null);
	const [imageSrc1, setImageSrc1] = useState<string | null>(null);
	const [imageSrc2, setImageSrc2] = useState<string | null>(null);
	const [imageSrc3, setImageSrc3] = useState<string | null>(null);
	const [imageSrc4, setImageSrc4] = useState<string | null>(null);
	const [imageSrc5, setImageSrc5] = useState<string | null>(null);
	const [imageSrc6, setImageSrc6] = useState<string | null>(null);
	const [imageSrc7, setImageSrc7] = useState<string | null>(null);
	const [originalData, setOriginalData] = useState<any>({});

	const [isSave, setIsSave] = useState<boolean>(false);
	const [dataWithoutImg, setDataWithoutImg] = useState<IDataWithoutImg>();

	const handleFileChange = async (event: any, imageSetter: any, fieldName: any) => {
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
		image1: z.string().min(1, "Image is required"),
		name2: z.string().min(1, "Name is required"),
		image2: z.string().min(1, "Image is required"),
		name3: z.string().min(1, "Name is required"),
		image3: z.string().min(1, "Image is required"),
		name4: z.string().min(1, "Name is required"),
		image4: z.string().min(1, "Image is required"),
		name5: z.string().min(1, "Name is required"),
		image5: z.string().min(1, "Image is required"),
		name6: z.string().min(1, "Name is required"),
		image6: z.string().min(1, "Image is required"),
		name7: z.string().min(1, "Name is required"),
		image7: z.string().min(1, "Image is required"),
	});

	const {
		register,
		getValues,
		trigger,
		setValue,
		watch,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });

	const handleSave = async () => {
		let valid = await trigger();
		if (!valid) return toast.warn("Validate Failed");

		DialogService.save("Do you want to save the changes ?", async () => {
			let param = getValues();
			if(param.image1 === originalData.image1) param.image1 = '';
      if(param.image2 === originalData.image2) param.image2 = '';
      if(param.image3 === originalData.image3) param.image3 = '';
      if(param.image4 === originalData.image4) param.image4 = '';
			if(param.image5 === originalData.image5) param.image5 = '';
      if(param.image6 === originalData.image6) param.image6 = '';
      if(param.image7 === originalData.image7) param.image7 = '';
			let re = await savePSolar(param);
			if (re.status === 200) {
				setIsSave(true);
				DialogService.success("Your data has been saved", () => {});
			}
		});
	};

	const getData = async () => {
		let rs = await getPSolar();
		if (rs) {
			for (const [key, value] of Object.entries(rs)) {
				setValue(key, value);
			}
			setImageSrc1(rs.image1);
			setImageSrc2(rs.image2);
			setImageSrc3(rs.image3);
			setImageSrc4(rs.image4);
			setImageSrc5(rs.image5);
			setImageSrc6(rs.image6);
			setImageSrc7(rs.image7);
			setOriginalData(rs);

			setDataWithoutImg({
				id: rs._id,
				workingFields: rs.workingFields,
			});
		}
	};

	useEffect(() => {
		getData();
	}, [isSave]);

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "right", mb: 2 }}>
				<Button
					onClick={handleSave}
					variant="contained"
					className="bg-blue-600"
					startIcon={<FaRegSave />}
				>
					Save
				</Button>
			</Box>

			{dataWithoutImg && (
				<TableWorkingFields data={dataWithoutImg} workingFieldUrl="/user/pages/solar/workingField" />
			)}

			<Box className="w-40 mb-4">
				<input
					type="file"
					{...register("image1")}
					ref={fileImg1}
					style={{ display: "none" }}
					onChange={(e) => handleFileChange(e, setImageSrc1, "image1")}
				/>
				<Button
					variant="contained"
					color="primary"
					className="bg-mte mb-2"
					onClick={() => handleUploadClick(fileImg1)}
				>
					Upload
				</Button>
				{imageSrc1 && (
					<Card>
						<CardMedia component="img" height="20" image={imageSrc1} alt="Preview" />
					</Card>
				)}
			</Box>

			<Grid container spacing={10}>
				<Grid md={6}>
					<Box className="w-40 mb-4">
						<input
							type="file"
							{...register("image2")}
							ref={fileImg2}
							style={{ display: "none" }}
							onChange={(e) => handleFileChange(e, setImageSrc2, "image2")}
						/>
						<Button
							variant="contained"
							color="primary"
							className="bg-mte mb-2"
							onClick={() => handleUploadClick(fileImg2)}
						>
							Upload
						</Button>
						{imageSrc2 && (
							<Card>
								<CardMedia component="img" height="20" image={imageSrc2} alt="Preview" />
							</Card>
						)}
					</Box>
					<TextField
						error={Boolean(errors.name2)}
						InputLabelProps={{ shrink: !!watch("name2") }}
						required
						fullWidth
						variant="outlined"
						size="small"
						label="Name"
						autoFocus
						{...register("name2")}
					/>
					{/* @ts-ignore */}
					{errors.name2 && (<Typography variant="caption" color={"red"}>{errors.name2.message}</Typography>)}
				</Grid>
				<Grid md={6}>
					<Box className="w-40 mb-4">
						<input
							type="file"
							{...register("image3")}
							ref={fileImg3}
							style={{ display: "none" }}
							onChange={(e) => handleFileChange(e, setImageSrc3, "image3")}
						/>
						<Button
							variant="contained"
							color="primary"
							className="bg-mte mb-2"
							onClick={() => handleUploadClick(fileImg3)}
						>
							Upload
						</Button>
						{imageSrc3 && (
							<Card>
								<CardMedia component="img" height="20" image={imageSrc3} alt="Preview" />
							</Card>
						)}
					</Box>
					<TextField
						error={Boolean(errors.name3)}
						InputLabelProps={{ shrink: !!watch("name3") }}
						required
						fullWidth
						variant="outlined"
						size="small"
						label="Name"
						autoFocus
						{...register("name3")}
					/>
					{/* @ts-ignore */}
					{errors.name3 && (<Typography variant="caption" color={"red"}>{errors.name3.message}</Typography>)}
				</Grid>
				<Grid md={6}>
					<Box className="w-40 mb-4">
						<input
							type="file"
							{...register("image4")}
							ref={fileImg4}
							style={{ display: "none" }}
							onChange={(e) => handleFileChange(e, setImageSrc4, "image4")}
						/>
						<Button
							variant="contained"
							color="primary"
							className="bg-mte mb-2"
							onClick={() => handleUploadClick(fileImg4)}
						>
							Upload
						</Button>
						{imageSrc4 && (
							<Card>
								<CardMedia component="img" height="20" image={imageSrc4} alt="Preview" />
							</Card>
						)}
					</Box>
					<TextField
						error={Boolean(errors.name4)}
						InputLabelProps={{ shrink: !!watch("name4") }}
						required
						fullWidth
						variant="outlined"
						size="small"
						label="Name"
						autoFocus
						{...register("name4")}
					/>
					{/* @ts-ignore */}
					{errors.name4 && (<Typography variant="caption" color={"red"}>{errors.name4.message}</Typography>)}
				</Grid>
				<Grid md={6}>
					<Box className="w-40 mb-4">
						<input
							type="file"
							{...register("image5")}
							ref={fileImg5}
							style={{ display: "none" }}
							onChange={(e) => handleFileChange(e, setImageSrc5, "image5")}
						/>
						<Button
							variant="contained"
							color="primary"
							className="bg-mte mb-2"
							onClick={() => handleUploadClick(fileImg5)}
						>
							Upload
						</Button>
						{imageSrc5 && (
							<Card>
								<CardMedia component="img" height="20" image={imageSrc5} alt="Preview" />
							</Card>
						)}
					</Box>
					<TextField
						error={Boolean(errors.name5)}
						InputLabelProps={{ shrink: !!watch("name5") }}
						required
						fullWidth
						variant="outlined"
						size="small"
						label="Name"
						autoFocus
						{...register("name5")}
					/>
					{/* @ts-ignore */}
					{errors.name5 && (<Typography variant="caption" color={"red"}>{errors.name5.message}</Typography>)}
				</Grid>
				<Grid md={6}>
					<Box className="w-40 mb-4">
						<input
							type="file"
							{...register("image6")}
							ref={fileImg6}
							style={{ display: "none" }}
							onChange={(e) => handleFileChange(e, setImageSrc6, "image6")}
						/>
						<Button
							variant="contained"
							color="primary"
							className="bg-mte mb-2"
							onClick={() => handleUploadClick(fileImg6)}
						>
							Upload
						</Button>
						{imageSrc6 && (
							<Card>
								<CardMedia component="img" height="20" image={imageSrc6} alt="Preview" />
							</Card>
						)}
					</Box>
					<TextField
						error={Boolean(errors.name6)}
						InputLabelProps={{ shrink: !!watch("name6") }}
						required
						fullWidth
						variant="outlined"
						size="small"
						label="Name"
						autoFocus
						{...register("name6")}
					/>
					{/* @ts-ignore */}
					{errors.name6 && (<Typography variant="caption" color={"red"}>{errors.name6.message}</Typography>)}
				</Grid>
				<Grid md={6}>
					<Box className="w-40 mb-4">
						<input
							type="file"
							{...register("image7")}
							ref={fileImg7}
							style={{ display: "none" }}
							onChange={(e) => handleFileChange(e, setImageSrc7, "image7")}
						/>
						<Button
							variant="contained"
							color="primary"
							className="bg-mte mb-2"
							onClick={() => handleUploadClick(fileImg7)}
						>
							Upload
						</Button>
						{imageSrc7 && (
							<Card>
								<CardMedia component="img" height="20" image={imageSrc7} alt="Preview" />
							</Card>
						)}
					</Box>
					<TextField
						error={Boolean(errors.name7)}
						InputLabelProps={{ shrink: !!watch("name7") }}
						required
						fullWidth
						variant="outlined"
						size="small"
						label="Name"
						autoFocus
						{...register("name7")}
					/>
					{/* @ts-ignore */}
					{errors.name7 && (<Typography variant="caption" color={"red"}>{errors.name7.message}</Typography>)}
				</Grid>
			</Grid>
		</>
	);
};

export default FormSolar;
