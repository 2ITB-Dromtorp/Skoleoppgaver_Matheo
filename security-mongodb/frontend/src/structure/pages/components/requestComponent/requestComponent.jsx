import './requestComponent.css'

import { RequestInfoContext } from '../../../../context';
import { useContext } from 'react';
import { Link } from 'react-router-dom'

export default function RequestComponent({id, userGivenName, userSurname, userEmail, userClass, itemSerialNumber, itemToolName}) {
    const accessToken = localStorage.getItem("accessToken");

    const {setRequestInfo} = useContext(RequestInfoContext);

	async function approveRequest(){
        const response = await fetch("/api/accept-request", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${accessToken}`	
            },
            body:JSON.stringify({
                id:id
            })
        })

        const resData = await response.json();
        if(!response.ok&&resData.message){
            alert(resData.message);
        }
        setRequestInfo(resData.data);
    }

    async function denyRequest(){
        const response = await fetch("/api/deny-request", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${accessToken}`	
            },
            body:JSON.stringify({
                id:id
            })
        })

        const resData = await response.json();
        if(!response.ok&&resData.message){
            alert(resData.message);
        }
        setRequestInfo(resData.data);
    }

	return (
        <div className="requestcomponent-main">
            <div className='requestcomponent-info-container'>
                <Link className='requestcomponent-info' to={`/profile/${userEmail}`}>
                    <p>{userGivenName} {userSurname}</p>
                    <p>{userClass}</p>
                </Link>
                <Link className='requestcomponent-info' to={`/item/${itemSerialNumber}`}> 
                    <p>{itemToolName}</p>
                    <p>{itemSerialNumber}</p>
                </Link>
            </div>
            <div className='requestcomponent-options-container'>
                <button className='requestcomponent-options apply' onClick={()=>approveRequest()}>APPROVE</button>
                <button className='requestcomponent-options deny' onClick={()=>denyRequest()}>DENY</button>
            </div>
        </div>
	);
}