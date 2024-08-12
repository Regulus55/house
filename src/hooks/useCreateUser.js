import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const createUser = async (userInput) => {
    const {data} = await axios.post('http://localhost:7070/api/auth/signup', userInput)
    return data.body
}

const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (userInput) => createUser(userInput),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}

export default useCreateUser