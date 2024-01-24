import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";


const useGetAllFrdRequestByUserId = (id) => {
    return useQuery({
        queryKey: ["allFrdRequests", id],
        queryFn: ({queryKey}) =>
          { 
            return fetchData({
                url: URL + "users/getConnectionListById",
                isAuthRequired: true,
                method: "POST"
            },
            { data: [{ id: queryKey[1] }] })},
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        }
        });
};

export { useGetAllFrdRequestByUserId };
