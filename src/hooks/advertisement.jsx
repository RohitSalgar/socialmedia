
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";

const useGetAdvertisement = () => {
    return useQuery({
        queryKey: ["oneAd"],
        queryFn: () =>
        fetchData({
                url: URL + "advertisement/getAdvertisement",
                isAuthRequired: true,
            }),
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        }
    });
};
export { useGetAdvertisement};
