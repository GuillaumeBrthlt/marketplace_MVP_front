import GetMap from "./map";
import { useState, useEffect } from "react";


export function Map({property}) {

  const [coords, setCorrds] = useState({
    latitude: "",
    longitude: ""
  });

  const displayName = property.address

  useEffect(() => {
    let url = `https://nominatim.openstreetmap.org/search?
    street=${property.address}
    &city=${property.city}
    &postalcode=${property.zipcode}&format=json`;
    getData(url);
  }, [property]);

  function error(err) {
    if (
      err.code === 1 || //if user denied accessing the location
      err.code === 2 || //for any internal errors
      err.code === 3 //error due to timeout
    ) {     
      alert(err.message);
    } else {
      alert(err);
    }
  }

  function getData(url) {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setCorrds({
          latitude: data[0].lat,
          longitude: data[0].lon
        });
      })
      .catch(() => error("Please Check your input"));
  }

  return (
    <div className="Map">
      <GetMap coords={coords} display_name={displayName} />
    </div>
  );
}