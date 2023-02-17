import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function LoadGPS() {
  const [gps, setGps] = useState(null);
  const [error_msg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const gps = await Location.getCurrentPositionAsync({});
      setGps(gps);
    })();
  }, []);

  let info = "Loading GPS...";
  if (error_msg) {
    info = error_msg;
  } else if (gps) {
    info = `latitude: ${gps.coords.latitude}, longitude: ${gps.coords.longitude}`;
  }

  return { info, gps, error_msg }
}
