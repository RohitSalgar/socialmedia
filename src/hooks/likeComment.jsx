import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";
import { useSelector } from "react-redux";

const useGetPostComment = (id) => {
	return useQuery({
		queryKey: ["postComment", id],
		queryFn: () =>
			fetchData(
				{
					url: URL + "post/getCommentAndReply",
					method: "POST",
					isAuthRequired: true,
				},
				{ data: [{postId:id}] }
			),
		enabled: !!id,
		onError: (error) => {
			toast.error(error.message.split(":")[1]);
		},
	});
};

const useLikeDisLike = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "post/updatePostLike",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trending"] });
            queryClient.invalidateQueries({ queryKey: ["forYou"] });
            queryClient.invalidateQueries({ queryKey: ["friend"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useInsertComment = () => {
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
            queryClient.invalidateQueries({ queryKey: ["postComment"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};
const useInsertReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "post/postReply",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["postComment"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useDeleteComment = () => {
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
            queryClient.invalidateQueries({ queryKey: ["postComment"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useDeleteReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "post/deleteReply ",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["postComment"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};




export { useInsertComment, useDeleteComment,useGetPostComment,useInsertReply,useDeleteReply,useLikeDisLike };
