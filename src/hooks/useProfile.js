import React from 'react';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const getProfileInfo = async () => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await axios.get('http://localhost:7070/api/auth', config)
        console.log('profileInfo', result.data.body)
        // setProfileInfo(result.data.body)
        const {data} = await axios.get(
            "http://localhost:7070/api/auth",
            config
        );
        console.log("profileInfo", data.body);
        // const {agreeOfMarketing, etc} = data.body.consent;
        return data.body
    } catch (err) {
        console.log("겟인포 에러", err);
    }
};

const UseProfile = () => {
    return useQuery({
        queryKey: ['profileInfo'],
        queryFn: () => getProfileInfo()
    })
};

export default UseProfile;