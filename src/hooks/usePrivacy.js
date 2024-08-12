import React from 'react';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const getPrivacyInfo = async () => {

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const {data} = await axios.get('http://localhost:7070/api/auth', config)
    return data.body.profile
}
const UsePrivacy = () => {
    return useQuery({
        queryKey: ['privacy'],
        queryFn: () => getPrivacyInfo()
    })
};

export default UsePrivacy;