"use client";
import { IDataWorkingField } from "@app/user/pages/automation/_server/FormAutomationAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogService } from "@lib/DialogService";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";

interface FormWorkingFieldProps {
	id: string | null;
	backUrl: string;
	getWorkingFieldById: (id: string) => Promise<any>;
	getDataOfThis: (id: string) => Promise<any>;
	createNewWorkingField: (
		id: string,
		data: IDataWorkingField
	) => Promise<{
		status: number;
	}>;
	updateWorkingFieldByWorkingId: (
		id: string,
		data: IDataWorkingField
	) => Promise<{
		status: number;
	}>;
}

const FormWorkingField = ({
	id,
	backUrl,
	getWorkingFieldById,
	createNewWorkingField,
	getDataOfThis,
	updateWorkingFieldByWorkingId,
}: FormWorkingFieldProps) => {
	const router = useRouter();
	const schema = z.object({
		title: z.string().min(4, "User Name must be at least 3 characters"),
		sub1: z.string().optional(),
		sub2: z.string().optional(),
	});

	const {
		register,
		trigger,
		formState: { errors },
		watch,
		setValue,
		getValues,
	} = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
	const [isSave, setIsSave] = useState<boolean>(false);

	const handleSave = async () => {
		let valid = await trigger();
		if (!valid) return toast.warn("Validate Failed");

		DialogService.save("Do you want to save the changes ?", async () => {
			let param = getValues();
			let re = await createNewWorkingField(id as string, param);
			if (re.status === 200) {
				DialogService.success("Your data has been saved", () => {
					router.push(backUrl);
				});
			}
		});
	};

	const handleUpdate = async () => {
		let valid = await trigger();
		if (!valid) return toast.warn("Validate Failed");

		DialogService.save("Do you want to save the changes ?", async () => {
			let param = getValues();
			let re = await updateWorkingFieldByWorkingId(id as string, param);
			if (re.status === 200) {
				DialogService.success("Your data has been saved", () => {
					router.push(backUrl);
				});
			}
		});
	};

	const getDataById = async () => {
		if (!id) return;
		let rs;
		let isSecondFetch = false;

		rs = await getWorkingFieldById(id);
		setIsSave(false);

		if (!rs) {
			setIsSave(true);
			isSecondFetch = true;
			rs = await getDataOfThis(id);
		}

		setValue("sub1", !isSecondFetch ? rs.workingFields[0].descriptions[0].sub : "");
		setValue("sub2", !isSecondFetch ? rs.workingFields[0].descriptions[1].sub : "");
		setValue("title", !isSecondFetch ? rs.workingFields[0].title : "");
	};

	useEffect(() => {
		getDataById();
	}, [id]);

	return (
		<>
			<FormControl>
				<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
					<Link href={backUrl}>
						<Button variant="outlined" color="secondary" startIcon={<FaArrowLeft />}>
							Back
						</Button>
					</Link>
					<Button
						onClick={isSave ? handleSave : handleUpdate}
						variant="contained"
						className="bg-blue-600"
						startIcon={<FaRegSave />}
					>
						{isSave ? "Save" : "Update"}
					</Button>
				</Box>
				<Box className="mb-6">
					<TextField
						error={Boolean(errors.title)}
						InputLabelProps={{ shrink: !!watch("title") }}
						required
						fullWidth
						variant="outlined"
						size="small"
						label="Title"
						autoFocus
						{...register("title")}
					/>
					{/* @ts-ignore */}
					{errors.title && (
						<Typography variant="caption" color={"red"}>
							{errors.title.message}
						</Typography>
					)}
				</Box>
				<div className="flex items-center justify-between gap-8">
					<Box className="w-1/2 mb-4">
						<TextField
							InputLabelProps={{ shrink: !!watch("sub1") }}
							fullWidth
							multiline
							variant="outlined"
							size="small"
							label="Sub Title 1"
							autoFocus
							{...register("sub1")}
						/>
					</Box>
					<Box className="w-1/2 mb-4">
						<TextField
							InputLabelProps={{ shrink: !!watch("sub2") }}
							fullWidth
							variant="outlined"
							size="small"
							label="Sub Title 2"
							autoFocus
							multiline
							{...register("sub2")}
						/>
					</Box>
				</div>
			</FormControl>
		</>
	);
};

export default FormWorkingField;
