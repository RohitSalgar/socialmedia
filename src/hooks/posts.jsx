import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";
import { useSelector } from "react-redux";

const useGetTrendingPosts = () => {
    const { userId } = useSelector((state) => state.profile.profileData);
    const { tabView } = useSelector((state) => state.profile);

    const payload = () => {
        if (tabView === "trending") {
            return {
                url: URL + "post/getTrendingPost",
                isAuthRequired: true,
            };
        } else if (tabView === "friend") {
            const dataPayload = {
                userId
            };
            return {
                url: URL + "post/getFriendsPost",
                method: "POST",
                data: [dataPayload]
            };
        } else {
            const dataPayload = {
                userId: userId
            };
            return {
                url: URL + "post/getForYouPost",
                method: "POST",
                data: [dataPayload]
            };
        }
    };

    return useQuery({
        queryKey: ["trendingPost", tabView],
        queryFn: () => fetchData(payload(tabView)),
        onSuccess: (data) => {
            console.log(data, "sdf");
        },
        enabled: !!tabView,
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
            console.log(error);
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
            onSuccessFunctions();
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
            queryClient.invalidateQueries({ queryKey: ["forYouPost"] });
            queryClient.invalidateQueries({ queryKey: ["friendPost"] });
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

const useGetMyPostList = (userId, viewList) => {
    return useQuery({
        queryKey: ["postList", userId],
        queryFn: () =>
            fetchData(
                {
                    url: URL + "post/getMyPost",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [{ userId }] }
            ),
        enabled: viewList === "post",

        onSuccess: (data) => {
            console.log(data, "query");
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

export { useInsertPost, useGetTrendingPosts, useDeletePost, useReportPost, useGetMyPostList };
