import Head from "next/head";
import Map from "../components/Map";
export default function Home({ spaceXData }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Lets build tesla</h1>
      <div className="flex flex-col space-y-5 w-full">
        <Map spaceXData={spaceXData} />

        {spaceXData?.map((landingPad) => (
          <div key={landingPad.id}>
            <p>Landing Zone {landingPad.full_name}</p>
            <p>Location {landingPad.locality}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const spaceXData = await fetch("https://api.spacexdata.com/v4/landpads").then(
    (res) => res.json()
  );
  return {
    props: {
      spaceXData,
    },
  };
}
