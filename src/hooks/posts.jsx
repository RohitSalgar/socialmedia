import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";

const useGetTrendingPosts = (tabView) => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: () => {
      return fetchData({
        url: URL + "post/getTrendingPost",
        isAuthRequired: true,
      });
    },
    enabled: tabView === "trending",
  });
};

const useGetFriendsPost = (tabView, payload, onSuccess) => {
  return useQuery({
    queryKey: ["friend"],
    queryFn: () =>
      fetchData(
        {
          url: URL + "post/getFriendsPost",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [payload] }
      ),
    onSuccess: (data) => {
      onSuccess(data);
    },
    enabled: tabView === "friend",
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetForYouPost = (tabView, payload, onSuccess) => {
  return useQuery({
    queryKey: ["forYou"],
    queryFn: () =>
      fetchData(
        {
          url: URL + "post/getForYouPost",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [payload] }
      ),
    onSuccess: (data) => {
      onSuccess(data);
    },
    enabled: tabView === "forYou",
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
      queryClient.invalidateQueries({ queryKey: ["trending"] });
      queryClient.invalidateQueries({ queryKey: ["forYou"] });
      queryClient.invalidateQueries({ queryKey: ["friend"] });
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
      queryClient.invalidateQueries({ queryKey: ["trending"] });
      queryClient.invalidateQueries({ queryKey: ["forYou"] });
      queryClient.invalidateQueries({ queryKey: ["friend"] });
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
      onSuccessFunctions();
      queryClient.invalidateQueries({ queryKey: ["trending"] });
      queryClient.invalidateQueries({ queryKey: ["friend"] });
      queryClient.invalidateQueries({ queryKey: ["forYou"] });
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

export {
  useInsertPost,
  useGetTrendingPosts,
  useDeletePost,
  useReportPost,
  useGetMyPostList,
  useGetForYouPost,
  useGetFriendsPost,
};
