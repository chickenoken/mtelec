import "@app/globals.css";
import { StyledEngineProvider } from '@mui/material/styles';
import { Container, CssBaseline, Skeleton, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { Suspense } from "react";
import { Metadata } from "next";
import LayoutUser from "@/components/layoutUser/LayoutUser";
import { validateRequest } from "@auth/auth";
import NProgress from "@/components/nprogress/NProgress";
import 'react-toastify/dist/ReactToastify.css';
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'mtelec',
  description: 'mtelec',
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <NProgress>
      <Box sx={{ display: "flex" }}>
        <LayoutUser />
        <Box component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            backgroundColor: "#f5f5f5",
          }}>
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 2, mb: 2 }}>
            <Suspense fallback={<Skeleton />}>
              {children}
            </Suspense>
          </Container>
        </Box>
      </Box>
      </NProgress>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        />
    </StyledEngineProvider>
  );
}
