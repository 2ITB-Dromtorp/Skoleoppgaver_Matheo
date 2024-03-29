import '../../css/mainSite.css'
import { socket } from "../../App";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RoomIdContext } from "../../context";

import logo from '../../images/blackjack.png'

export default function MainSite() {
  const navigate = useNavigate()
  const { setRoomId} = useContext(RoomIdContext)
  const [nameOfNewRoom, setNameOfNewRoom] = useState("")

  useEffect(() => {
    function joinedRoom(name){
      if(!name) return;
      setRoomId(name);
      navigate("/lobby");
    }

    socket.emit("connection")

    socket.on('joinedRoom', (roomName)=> joinedRoom(roomName))
    socket.on('roomAlreadyExist', ()=>alert("A room of that name already exists"))

    return () => {
      socket.off('joinedRoom', alert);
    };
  }, [setRoomId, navigate]);

  const createRoom = (e) =>{
    e.preventDefault();
    socket.emit("createRoom", nameOfNewRoom);
  }

  return (
    <div className='mainSite-main'>
        <img src={logo} alt=''/>
        <form onSubmit={createRoom}>
            <input type='text' value={nameOfNewRoom} onInput={(e)=>setNameOfNewRoom(e.target.value)}/>
            <button type='submit' className='buttonDesign'>Create new room</button>
        </form>
    </div>
  );
};