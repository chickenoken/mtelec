import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { StyledEngineProvider } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./_component/navbar/Navbar";
import Footer from "./_component/footer/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Mtelec',
  description: 'Mtelec is Electrical Engineering – Design, Industrial Installation, Energy Efficiency,Preventive Maintenance and Electrical Safety.',
  robots: {
    index: true, 
    follow: true
  },
  openGraph: {
    title: 'Mtelec',
    description: 'Mtelec is Electrical Engineering – Design, Industrial Installation, Energy Efficiency,Preventive Maintenance and Electrical Safety.',
    url: 'https://mtelec.vn/',
    siteName: 'Mtelec',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mtelec',
    description: 'Our basic business is Electrical Engineering – Design, Industrial Installation, Energy Efficiency,Preventive Maintenance and Electrical Safety.',
  },
};

const jsonLdSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Mtelec",
  "description": "Mtelec is Electrical Engineering – Design, Industrial Installation, Energy Efficiency,Preventive Maintenance and Electrical Safety.",
  "url": "https://mtelec.vn/",
  "publisher": {
    "@type": "Organization",
    "name": "Mtelec",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mtelec.vn/img/logo.png"
    }
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8LTTQ67JZB"></Script>
        <Script id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8LTTQ67JZB');
          `}
        </Script>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <Navbar/>
        <Box className="pt-32" >
          {children}
        </Box>
        <Footer />
      </StyledEngineProvider>
    </>
  );
}
