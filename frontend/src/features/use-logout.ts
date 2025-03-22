import { useMutation, useQueryClient } from "@tanstack/react-query";


import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/api-client/apiClient";



export const useLogout=()=>{
    const toast=useToast();
    const queryClient=useQueryClient();

    const mutation=useMutation({
        mutationFn:async()=>{
            const response=await  apiClient.post("/users/logout");
            if(!response){
                throw new Error("Failed to logout")
            }   
            return response
        },
        onSuccess:()=>{
            toast.toast({title: "Logged out",
                description: "You have been logged out",
                variant: "destructive",});
            window.location.href="/";
            queryClient.invalidateQueries({queryKey:["current"]})
                    },
        onError:(error)=>{
            toast.toast({title: "Error",
                description: error.message,
                variant: "destructive",})
        }
    })
    return mutation;
}




































// import {useMutation} from "@tanstack/react-query"
// import { InferRequestType,InferResponseType } from "hono"

// import {client} from "@/lib/rpc"


// type ResponseType =InferResponseType<typeof client.api.auth.login["$post"]>;
// type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

// export const useLogin =()=>{
//     const mutation=useMutation<ResponseType,Error,RequestType>({
//         mutationFn:async({json})=>{
//             const response=await client.api.auth.login["$post"]({json});
//         return await response.json();
//         }
//     });
//     return mutation;
// }
