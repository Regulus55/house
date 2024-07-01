import React, {useEffect, useState} from 'react';
import axios from "axios";

const Profile = () => {
    const [profileInfo, setProfileInfo] = useState({})

    const getProfileInfo = async () => {
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const result = await axios.get('http://localhost:7070/api/auth',config)
            // ^^유알엘에 필요한 정보가 담겨있고, config 에 authorization 정보를 담겨있다
            console.log('+++++++++++++++++++++',result.data.body)
            setProfileInfo(result.data.body)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getProfileInfo()
    },[])

    return (
        <div>
            {}
        </div>
    );
};

export default Profile;