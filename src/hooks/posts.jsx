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

const useInsertPost = (onSuccessFunctions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "post/addPost",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: () => {
            onSuccessFunctions()
            queryClient.invalidateQueries({ queryKey: ["trendingPost"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};
const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "post/deletePost",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trendingPost"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useReportPost = (onSuccessFunctions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "post/reportPost",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: () => {
            onSuccessFunctions()
            queryClient.invalidateQueries({ queryKey: ["trendingPost"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};


export { useInsertPost, useGetTrendingPosts,useDeletePost,useReportPost };
