import { IWorkingField } from "@app/(main)/services/automation/page";
import { Box, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Image from "next/image";
import { BsDot } from "react-icons/bs";

interface IProps {
	workingField: IWorkingField[];
}

export default function RenderWorkingField({ workingField }: IProps) {
	return (
		<div className={`${workingField.length > 4 ? "grid-cols-2 gap-x-5" : "grid-cols-1"} grid gap-y-2`}>
			{workingField.map((item: IWorkingField, index: number) => (
				<div key={index}>
					<Box className="flex items-start">
						<Image className="me-2 mt-0.5" src="/asset/svg/icon.svg" alt="alt" width={15} height={15} />
						<Typography className="text-sm font-bold">{item.title}</Typography>
					</Box>
					<Box>
						{!!item.descriptions.length && (
							<div className="grid grid-cols-2">
								{item.descriptions.map(
									(desc: { sub: string; column: number }, index: number) => {
										if (!desc.sub) return null;

										const cleanedDesc = desc.sub.replace(/<p>|<\/p>/g, "");
										const lines = cleanedDesc.split("\n");
										return (
											<div key={index}>
												{lines.map((line: string, index: number) => (
													<ListItem
														alignItems="flex-start"
														key={index}
														sx={{ padding: "0", margin: "0" }}
													>
														<ListItemIcon
															sx={{
																minWidth: "30px",
																ml: line.endsWith(":") ? 0 : 2,
															}}
														>
															{line.endsWith(":") ? "" : <BsDot />}
														</ListItemIcon>
														<ListItemText 
															primary={
																line.endsWith(":") ? line.slice(0, -1) : line
															}
															primaryTypographyProps={{
																fontWeight: line.endsWith(":")
																	? "bold"
																	: "normal",
																className: line.endsWith(":") ? "" : 'text-sm',
															}}
														/>
													</ListItem>
												))}
											</div>
										);
									}
								)}
							</div>
						)}
					</Box>
				</div>
			))}
		</div>
	);
}
