import { useMutation } from "@tanstack/react-query";
import { fetchData } from "../helper";
import { URL } from "../config";
import { toast } from "react-toastify";

const useAddSchedule = () => {
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "users/updateUserDetails",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};


export { useAddSchedule }