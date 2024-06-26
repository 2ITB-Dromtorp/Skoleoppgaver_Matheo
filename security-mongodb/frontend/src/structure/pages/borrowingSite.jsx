import '../../css/borrowingSite.css'

import { useEffect, useState } from "react";
import { GetFetch } from '../functions.jsx';
import ItemComponent from "./components/itemComponent";
import { useNavigate } from 'react-router-dom';

export default function LendingSite() {
  const navigate = useNavigate();
  const [listOfItems, setListOfItems] = useState([]);

  useEffect( ()=>{
    async function fetchData(number) {
      try{
        const response = await GetFetch(`/api/list-items?limit=${number}`, navigate);
  
        if(!response.ok){
          const responseData = await response.json();
          alert(responseData.message);
          return;
        } 
  
        const arrayWithData = (await response.json());
  
        setListOfItems(arrayWithData.data)
      }
      catch(error){
        console.error(error);
      }
    }
    
    fetchData(25);
  },[navigate])

  

  return (
    <div className='borrowingsite-main'>          
      {listOfItems.length?listOfItems.map((item, index)=>
        <ItemComponent key={index} tool={item.tool} serialNumber={item.serialNumber} borrowedBy={item.borrowedBy}/>
      ):"Loading..."}
    </div>
  );
}