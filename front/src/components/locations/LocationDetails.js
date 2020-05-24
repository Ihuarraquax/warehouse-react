import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { fetchLocation, updateLocation } from "../../api"
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  link: {
    textDecoration: "none"
  }
});

export default function LocationDetails(props) {
  const [location, setLocation] = useState({});
  const [count, setCount] = useState(-1);
  const [newCount, setNewCount] = useState(-1);
  const [loading, setLoading] = useState(true);
  
  const asyncFetchLocation = async (name) => {
    const location = await fetchLocation(name);
    setLocation(location);
    setCount(location.count);
    setNewCount(location.count);
    setLoading(false);
  }

  useEffect(() => {
    asyncFetchLocation(props.match.params.name);
  }, [])

  const handleChange = (e) => {
    setNewCount(e.target.value)
  }
  const handleButtonClick = () => {
    
    const updatedLocation = location;
    updatedLocation.count = newCount;
    updateLocation(updatedLocation);
    setCount(updatedLocation.count)
  }
  if(!loading){
  return (
    <div>
      {location.name}(aktualny stan: {count}) : <input type="number" value={newCount} onChange={handleChange}></input>
      <Button variant="contained" disabled={count == newCount} onClick={handleButtonClick}>
        Zapisz zmiany
      </Button>
    </div>

  )}
  else {
    return "loading"
  }
}
