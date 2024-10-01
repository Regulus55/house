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
        // console.log('===sendEmail의Data',data)
        //     ^^ success, code:201 같은 데이터임
            alert('인증메일 발송 완료')
        }
    })
}

export default useSendEmail