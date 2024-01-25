import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../helper";
import { toast } from "react-toastify";


const useGetTrendingNews = () => {
    return useQuery({
        queryKey: ["trendingNews"],
        queryFn: () =>
            fetchData({
                url: "https://google-news13.p.rapidapi.com/latest",
                headers: {
                    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
                    'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
                },
                method: "GET",
                isAuthRequired: true,
            }),
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};


export { useGetTrendingNews }

