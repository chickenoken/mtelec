"use client";

import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const MapBox = () => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

  const [viewport, setViewport] = useState({
    latitude: 10.793942291129709,
    longitude: 106.59402916273123,
    zoom: 17,
    width: "100%",
    height: "400px",
  });

  const handleViewportChange = (evt: { viewState: { latitude: number; longitude: number; zoom: number } }) => {
    setViewport(prevViewport => ({
      ...prevViewport,
      latitude: evt.viewState.latitude,
      longitude: evt.viewState.longitude,
      zoom: evt.viewState.zoom,
    }));
  };

  return (
    <Box sx={{ width: '100%', height: '400px', position: 'relative' }}>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={handleViewportChange}
      >
        <Marker
          latitude={10.7939984817735}
          longitude={106.59412371219143}
          anchor="center"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100px' }}>
            <Image
              src="/asset/img/logo.png"
              alt="Marker Icon"
              width={50}
              height={50}
              style={{ marginBottom: '4px' }} // Add some space between the icon and text
            />
            <Typography variant="overline" className="font-bold text-red-400" sx={{ textAlign: 'center' }}>
              MTELEC Co., LTD
            </Typography>
          </div>
        </Marker>
      </ReactMapGL>
    </Box>
  );
};

export default MapBox;
