"use client";
import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material/";
import Link from "next/link";
import { MotionDiv } from "@components/motion/MotionDiv";

const Links = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredLink, setHoveredLink] = useState<null | string>(null);
  const isMobile = useMediaQuery('(max-width:800px)');

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    title: string
  ) => {
    setAnchorEl(event.currentTarget);
    setHoveredLink(title);
  };

  const handleClose = () => {
    if (anchorEl !== null) {
      setAnchorEl(null);
      setHoveredLink(null);
    }
  };

  const links = [
    {
      title: "About Us",
      path: "/about",
      subLinks: [
        { title: "Company Information", path: "/about/company" },
        { title: "About Our Team", path: "/about/teams" },
        { title: "PPE Protection", path: "/about/protection" },
        { title: "Recruitment", path: "/about/recruitment" },
      ],
    },
    {
      title: "Services",
      path: "/services",
      subLinks: [
        { title: "Electrical Design & Installation",path: "/services/design" },
        { title: "Automation Design & Installation", path: "/services/automation" },
        { title: "Solar System", path: "/services/solar" },
        { title: "ELV Design & Installation", path: "/services/elv" },
        { title: "HVAC Design & Installation", path: "/services/hvac" },
        { title: "Electrical Service", path: "/services/electrical" },
      ],
    },
    { title: "Projects", path: "/projects" },
    { title: "Product", path: "/products" },
    { title: "News", path: "/news" },
    { title: "Contact Us", path: "/contact" },
  ];

  return (
    <Box display={isMobile ? 'initial' : 'flex'}>
      {links.map((link, index) => (
        <Box key={index} className={isMobile ? "mb-2" : "border-r-2"}>
          <MotionDiv
            style={{
              scale: link.title === hoveredLink ? 1.2 : 1,
              textDecoration: link.title === hoveredLink ? "underline" : "none",
              transition: "all 0.25s ease-in-out",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              handleClick(e, link.title);
            }}
          >
            <Link key={link.title} href={link.path} className="px-7 font-bold">
              {link.title}
            </Link>
          </MotionDiv>
          {link.subLinks && (isMobile || link.title === hoveredLink) ? (
            <Box className={isMobile ? "ml-6 mt-2" : "fixed bg-white text-black shadow-md"}>
              <ul onMouseLeave={handleClose}>
                {link.subLinks.map((subLink) => (
                  <Box
                    key={subLink.title}
                    sx={{
                      ":hover": {
                        background:
                          "linear-gradient(to left, #d1d5db, #f3f4f6, #d1d5db)",
                      },
                    }}
                    className="mb-2 w-full px-4 py-2"
                  >
                    <Link
                      className="w-full"
                      href={subLink.path}
                    >
                      {subLink.title}
                    </Link>
                  </Box>
                ))}
              </ul>
            </Box>
          ) : null}
        </Box>
      ))}
    </Box>
  );
};

export default Links;