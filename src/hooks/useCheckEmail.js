import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const checkEmail = async (userInput) => {
    const {data} = await axios.post('http://localhost:7070/api/auth/email/check', userInput)
    return data
}

const useCheckEmail = () => {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: (userInput) => checkEmail(userInput),
        onSuccess: (data) => {
            console.log('===cehckEmail의Data', data)
            alert('email 인증 완료')
        }
    })
}

export default useCheckEmail