import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const loginUser = async (userInput) => {
    const {data} = await axios.post('http://localhost:7070/api/auth/login', userInput)
    return data
}

const useLoginUser = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (userInput) => loginUser(userInput),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            console.log('--------------------',data.token)
            localStorage.setItem('token', data.token)
            navigate('/profile')
        },
        onError: (error) => {
            console.log('+++++error+++++',error)
        }
    })
};

export default useLoginUser;