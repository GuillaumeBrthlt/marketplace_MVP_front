import GetMap from "./map";
import { useState, useEffect } from "react";
import { usePropertyStore } from '../../contexts/PropertyContext';
import { observer } from "mobx-react-lite";

export const Map = observer(() => {

  const [coords, setCorrds] = useState({
    latitude: "",
    longitude: ""
  });
  const [display_name, setName] = useState();
  const [address, setAddress] = useState({});
  const propertyStore = usePropertyStore()


  useEffect(() => {
    console.log(propertyStore.propertyDetails)
    let url = `https://nominatim.openstreetmap.org/search?
    street=${propertyStore.address}
    &city=${propertyStore.city}
    &postalcode=${propertyStore.zipcode}&format=json`;
    getData(url);
  }, []);

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

  function update(field) {
    return (e) => {
      const value = e.currentTarget.value;
      setAddress((address) => ({ ...address, [field]: value }));
    };
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
        setName(data[0].display_name);
        setCorrds({
          latitude: data[0].lat,
          longitude: data[0].lon
        });
      })
      .catch(() => error("Please Check your input"));
  }

  //set form input( data entered ) to state on form submit
  function submitHandler(e) {
    e.preventDefault();

    let url = `https://nominatim.openstreetmap.org/search?
    street=${address.street}
    &city=${address.city}
    &postalcode=${address.postalcode}&format=json`;
    setName(address.city)
    getData(url);
  }

  return (
    <div className="Map">
      <h3>Voir l'adresse</h3>
      <section className="form-container">
        <form>
          <label>Rue:</label>
          <input
            value={address.street || ""}
            placeholder="1234 abc street"
            onChange={update("street")}
            id="street"
            type="text"
          />
          <label>Ville:</label>
          <input
            placeholder="Paris"
            type="text"
            value={address.city || ""}
            onChange={update("city")}
            id="city"
          />
          <label>zip code:</label>
          <input
            placeholder="75000"
            type="text"
            value={address.postalcode || ""}
            onChange={update("postalcode")}
            id="postalcode"
          />
          <br />
          <button onClick={(e) => submitHandler(e)}>Search</button>
        </form>
      </section>
      <GetMap coords={coords} dispaly_name={display_name} />
    </div>
  );
})