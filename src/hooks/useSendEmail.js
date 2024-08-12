import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const sendEmail = async (userInput) => {
    const {data} = await axios.post('http://localhost:7070/api/auth/email/send', userInput)
    return data
}

const useSendEmail = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (userInput) => sendEmail(userInput),
        onSuccess: (data) => {
        console.log('dddd====',data)
            alert('메일보냈음')
        }
    })
}

export default useSendEmail