"use client"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Gmap = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 10.793932291129709, lng: 106.59432916273144
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={17}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} label="MTELEC Co., LTD">
        </Marker>
      </GoogleMap>
    </LoadScript>
  );
};

export default Gmap;
