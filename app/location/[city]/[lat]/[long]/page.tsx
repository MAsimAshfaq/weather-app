import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChat from "@/components/HumiditiChat";
import InformationPanel from "@/components/InformationPanel";
import RainChat from "@/components/RainChat";
import TempChart from "@/components/TempChart";
import StatCard from "@/components/startCard";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import React from "react";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};
async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });
  const results: Root = data.myQuery;
  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <InformationPanel city={city} long={long} lat={lat} results={results} />
      <div className='flex-1 p-5 lg:p-10'>
        <div className='p-5'>
          <div className='pb-5'>
            <h2 className='text-xl font-bold'>Todays Overview</h2>
            <p className='text-sm text-gray-400'>
              last Updated at: {""}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>
          <div className='m-2 mb-10'>
            {/* CalloutCard */}
            <CalloutCard message='This is where GPT-4' />
          </div>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 m-2'>
            <StatCard
              title='Maximum Temperature'
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}`}
              color='yellow'
            />
            <StatCard
              title='Minimum Temperature'
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}`}
              color='green'
            />
            <div>
              <StatCard
                title='UV index'
                metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                color='rose'
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message='The UV is high today, be sure to SPF!'
                  warning
                />
              )}
            </div>
            <div className='flex space-x-3'>
              <StatCard
                title='Wind Speed'
                metric={`${results.current_weather.windspeed.toFixed(1)}`}
                color='cyan'
              />
              <StatCard
                title='Minimum Direction'
                metric={`${results.current_weather.winddirection.toFixed(1)}`}
                color='violet'
              />
            </div>
          </div>
        </div>
        <hr className='mb-5' />
        <div className='space-y-3'>
          <TempChart results={results} />
          <RainChat results={results} />
          <HumidityChat results={results} />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;

/**
 * https://api.open-meteo.com/v1/forecast?latitude=51.151&longitude=-0.13&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&current_weather=true&timezone=Europe%2FLondon
 */
