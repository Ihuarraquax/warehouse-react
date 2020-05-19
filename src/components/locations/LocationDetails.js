import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { fetchLocation } from "../../api"

const useStyles = makeStyles({
  link: {
    textDecoration: "none"
  }
});

export default function LocationDetails(props) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(-1);

  useEffect(() => {
    const asyncFetchLocation = async (name) => {
      const location = await fetchLocation(name);
      setName(location.name);
      setCount(location.count);
    }
    console.log(props.match.params.name)
    asyncFetchLocation(props.match.params.name);
  },[])

  const increaseCount = () =>{
    setCount(count+1)
  }

  return (
    <div>
        {name} : {count}
        <button onClick={increaseCount}>zwieksz</button>
    </div>
    
  )
}
