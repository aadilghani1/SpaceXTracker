import dynamic from "next/dynamic";
import Head from "next/head";
import { getCenter } from "geolib";
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function Map({ spaceXData }) {
  const coordinates = spaceXData?.map((item) => ({
    latitude: item.latitude,
    longitude: item.longitude,
  }));

  const { longitude, latitude } = getCenter(coordinates);

  return (
    <div className="h-1/2 w-full">
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""
        />
      </Head>
      <MapContainer
        className="w-full h-96"
        center={[latitude, longitude]}
        zoom={3}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {spaceXData?.map((landingPad) => (
          <Marker
            key={landingPad.id}
            position={[landingPad.latitude, landingPad.longitude]}
          >
            <Popup className="truncate">
              {landingPad.full_name} <br /> {landingPad.locality}
              <br />
              <br />
              <small>Status: {landingPad.status}</small>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
