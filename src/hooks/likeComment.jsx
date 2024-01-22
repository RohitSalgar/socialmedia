import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";

const useGetTrendingPosts = (id) => {
    return useQuery({
        queryKey: ["trendingPost", id],
        queryFn: () =>
            fetchData({
                url: URL + "post/getTrendingPost",
                isAuthRequired: true,
            }),
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useInsertComment = (onSuccessFunctions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "post/postComment ",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: ["trendingPost"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};
const useDeleteComment = (onSuccessFunctions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "post/deleteComment ",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: ["trendingPost"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};



export { useInsertComment, useDeleteComment };
