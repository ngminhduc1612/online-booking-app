import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const Single = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  console.log(path);
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`${path}`);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <>
            <h2>{data.name}</h2>
            <p>Type: {data.type}</p>
            <p>City: {data.city}</p>
            <p>Address: {data.address}</p>
            <p>Distance: {data.distance}</p>
            <h3>Description</h3>
            <p>{data.desc}</p>
            <h3>Rooms</h3>
            {data.rooms && data.rooms.length > 0 ? (
              <ul>
                {data.rooms.map((roomId, index) => (
                  <li key={index}>{roomId}</li>
                ))}
              </ul>
            ) : (
              <p>No rooms available.</p>
            )}
            <h3>Cheapest Price</h3>
            <p>{data.cheapestPrice} USD</p>
            {data.featured && <p>Featured Hotel</p>}
            <h3>Photos</h3>
            {data.photos && data.photos.length > 0 ? (
              <div className="photo-container">
                {data.photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`Photo ${index + 1}`} />
                ))}
              </div>
            ) : (
              <p>No photos available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Single;
