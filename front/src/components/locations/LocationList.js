import React, {useEffect, useState} from 'react'
import {fetchLocations, fetchLocation} from '../../api'
import LocationCard from './LocationCard';
export default function LocationList() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    const asyncFetchLocations = async () =>{
      setLoading(true);
      const fetchedLocations = await fetchLocations();
      fetchedLocations.sort((a,b) =>{
        if(a.name>b.name) return 1;
        if(a.name<b.name) return -1;
        return 0;
      })
      setLocations(fetchedLocations);
    } 
    asyncFetchLocations();
    setLoading(false);
  },[])
  if(loading){
    return "pobieranie lokacji"
  }
  return (
    <div>
      {locations.map((l) => 
      <LocationCard data={l}></LocationCard>
      )}
    </div>
  )
}
