"use client";
import { Button, Collapse, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsDashLg, BsInfoSquareFill } from "react-icons/bs";
import { IoLogOutOutline, IoNewspaperSharp } from "react-icons/io5";
import { MdDesignServices, MdExpandLess, MdExpandMore } from "react-icons/md";
import { RiMenuFoldFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { logout } from "./LayoutAction";
import { SiPagekit } from "react-icons/si";
import { AiFillProject } from "react-icons/ai";
import { RiProfileFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { clearRedisCache } from "./_server/LayoutUserActions";
import { DialogService } from "@lib/DialogService";

const drawerWidth: number = 250;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(1),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(8),
			},
		}),
	},
}));

const LayoutUser = () => {
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};
	const [reAbout, setReAbout] = React.useState(false);
	const [reSer, setReSer] = React.useState(false);
	const [reProj, setReProj] = React.useState(false);
	const [reUser, setReUser] = React.useState(false);

	const router = useRouter();

	const handleLogout = async () => {
		let result = await logout();
		if (result && result.status === 200) {
			toast.success(result.error, {
				closeOnClick: true,
				draggable: true,
				theme: "colored",
			});
			router.push("/login");
		} else {
			toast.error(result.error, {
				closeOnClick: true,
				draggable: true,
				theme: "colored",
			});
		}
	};

	const handleClearCache = async () => {
		let result = await clearRedisCache();
		if(result.status === 200){
			DialogService.success('Your data has been clear', () => {
			});
		}
	};

	return (
		<>
			<AppBar position="absolute" open={open} className="bg-mte text-white">
				<Toolbar sx={{ pr: "24px" }}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={toggleDrawer}
						sx={{
							marginRight: "36px",
							...(open && { display: "none" }),
						}}
					>
						<Image src="/asset/img/logo_white.png" width={50} height={50} alt="mtelec logo" />
					</IconButton>
					<Typography component="h6" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
						Admin
					</Typography>
					<Button onClick={handleClearCache} className="px-8 py-2 bg2-mte text-white font-bold mt-2" variant="text">Clear Cache</Button>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						px: [1],
					}}
				>
					<Link href="/user">
						<Image
							className="m-2"
							src="/asset/img/logo.png"
							width={50}
							height={50}
							alt="mtelec logo"
						/>
					</Link>
					<IconButton onClick={toggleDrawer}>
						<RiMenuFoldFill />
					</IconButton>
				</Toolbar>
				<Divider />
				<Paper style={{ maxHeight: '90vh', overflow: 'auto', boxShadow: 'none', border: 'none' }}>
					<List component="nav">
						<Link href="/user/pages/index">
							<ListItemButton>
								<ListItemIcon>
									<SiPagekit size="1.5em" />
								</ListItemIcon>
								<ListItemText primary="Index" />
							</ListItemButton>
						</Link>
						{/* ABOUT */}
						<ListItemButton onClick={() => setReAbout(!reAbout)}>
							<ListItemIcon>
								<BsInfoSquareFill size="1.5em" />
							</ListItemIcon>
							<ListItemText primary="About" />
							{reAbout ? <MdExpandLess /> : <MdExpandMore />}
						</ListItemButton>
						<Collapse in={reAbout} timeout="auto" unmountOnExit>
							<Link href="/user/pages/about">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="About" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/pages/company">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Company Info" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/employee">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Our Team" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/pages/ppe">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="PPE Protection" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/recruitment">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Recruitment" />
									</ListItemButton>
								</List>
							</Link>
						</Collapse>
						{/* SERVICE */}
						<ListItemButton onClick={() => setReSer(!reSer)}>
							<ListItemIcon>
								<MdDesignServices size="1.5em" />
							</ListItemIcon>
							<ListItemText primary="Service" />
							{reSer ? <MdExpandLess /> : <MdExpandMore />}
						</ListItemButton>
						<Collapse in={reSer} timeout="auto" unmountOnExit>
							<Link href="/user/pages/electricDesign">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Electrical Design" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/pages/automation">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Automation Design" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/pages/solar">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Solar System" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/pages/elv">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="ELV Design" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/pages/hvac">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="HVAC Design" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/pages/electricService">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Electrical Services" />
									</ListItemButton>
								</List>
							</Link>
						</Collapse>
						{/* PROJECT */}
						<ListItemButton onClick={() => setReProj(!reProj)}>
							<ListItemIcon>
								<AiFillProject size="1.5em" />
							</ListItemIcon>
							<ListItemText primary="Project" />
							{reProj ? <MdExpandLess /> : <MdExpandMore />}
						</ListItemButton>
						<Collapse in={reProj} timeout="auto" unmountOnExit>
							<Link href="/user/project">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Project" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/categories">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Categories" />
									</ListItemButton>
								</List>
							</Link>
						</Collapse>
						<Link href="/user/product">
							<ListItemButton>
								<ListItemIcon>
									<RiProfileFill size="1.5em" />
								</ListItemIcon>
								<ListItemText primary="Product" />
							</ListItemButton>
						</Link>
						<Link href="/user/news">
							<ListItemButton>
								<ListItemIcon>
									<IoNewspaperSharp size="1.5em" />
								</ListItemIcon>
								<ListItemText primary="News" />
							</ListItemButton>
						</Link>
						<ListItemButton onClick={() => setReUser(!reUser)}>
							<ListItemIcon>
								<FaCircleUser size="1.5em" />
							</ListItemIcon>
							<ListItemText primary="User" />
							{reUser ? <MdExpandLess /> : <MdExpandMore />}
						</ListItemButton>
						<Collapse in={reUser} timeout="auto" unmountOnExit>
							<Link href="/user/customer">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Customer" />
									</ListItemButton>
								</List>
							</Link>
							<Link href="/user/appliant">
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 4 }}>
										<ListItemIcon><BsDashLg /></ListItemIcon>
										<ListItemText primary="Applicant" />
									</ListItemButton>
								</List>
							</Link>
						</Collapse>
						<ListItemButton onClick={handleLogout}>
							<ListItemIcon>
								<IoLogOutOutline size="1.5em" />
							</ListItemIcon>
							<ListItemText primary="Log out" />
						</ListItemButton>
					</List>
				</Paper>
			</Drawer>
		</>
	);
};

export default LayoutUser;
