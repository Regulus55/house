import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const createUser = async (userInput) => {
    // const {data} = await axios.post('http://localhost:7070/api/auth/signup', userInput)
    console.log(userInput);
    // return data.body

}

const useCreateUser = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (userInput) => createUser(userInput),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            console.log('data=======',data)
        },
        onError: (error) => {
            console.log('+++++error+++++',error)
        }
    })
}

export default useCreateUser