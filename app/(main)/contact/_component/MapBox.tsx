"use client";
import { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getContactInfo } from "@app/user/contact/_server/FormContactAction";

const MapBox = () => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

  interface Contact {
		label: string;
    address: string;
    phone: string;
    email: string;
    latitude: string;
    longitude: string;
	}

  const [data, setData] = useState<Contact>();
	const [loading, setLoading] = useState(true);

  const [viewport, setViewport] = useState({
    latitude: 10.793942291129709,
    longitude: 106.59402916273123,
    zoom: 17,
    width: "100%",
    height: "400px",
  });

  const getData = async () => {
		let rs = await getContactInfo();
		setData(rs);
		setLoading(false);
    setViewport({
      latitude: parseFloat(rs.latitude) ,
      longitude: parseFloat(rs.longitude),
      zoom: 17,
      width: "100%",
      height: "400px",
    })
	};

	useEffect(() => {
		getData();
	}, []);

  const handleViewportChange = (evt: { viewState: { latitude: number; longitude: number; zoom: number } }) => {
    setViewport(prevViewport => ({
      ...prevViewport,
      latitude: evt.viewState.latitude,
      longitude: evt.viewState.longitude,
      zoom: evt.viewState.zoom,
    }));
  };

  return (
    <>
      {loading ? (
					<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
						<CircularProgress />
					</Box>
				) : (
					<>
          <Box sx={{ width: '100%', height: '400px', position: 'relative' }}>
            <ReactMapGL
              {...viewport}
              mapboxAccessToken={mapboxToken}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onMove={handleViewportChange}
            >
              <Marker
                latitude={typeof data?.latitude === 'string' ? parseFloat(data.latitude) : data?.latitude ?? 10.793942291129709}
                longitude={typeof data?.longitude === 'string' ? parseFloat(data.longitude) : data?.longitude ?? 106.59412371219143}
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
      </>
      )}
    </>
  );
};

export default MapBox;
