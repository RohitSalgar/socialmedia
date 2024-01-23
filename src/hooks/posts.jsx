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
      onSuccessFunctions();
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

export { useInsertPost, useGetTrendingPosts, useGetMyPostList };
