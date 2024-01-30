import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";
import { useSelector } from "react-redux";

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

const useGetPagePost = (tabView) => {
  return useQuery({
    queryKey: ["pagePost"],
    queryFn: () =>
      fetchData({
        url: URL + "post/getPagePost",
        isAuthRequired: true,
      }),

    enabled: tabView === "pages",
  });
};

const useGetNewsPosts = (tabView) => {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => {
      return fetchData({
        url: URL + "post/getAllNews",
        isAuthRequired: true,
      });
    },
    enabled: tabView === "news",
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

const useGetMyPagePost = (payload, onSuccess) => {
  const { dashboardView } = useSelector((state) => state.profile);
  return useQuery({
    queryKey: ["PagePost"],
    queryFn: () =>
      fetchData(
        {
          url: URL + "post/getPagePost",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [payload] }
      ),
    onSuccess: (data) => {
      onSuccess(data);
    },
    enabled: dashboardView === "pages",
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

const insertPost = async (data) => {
  let response = await fetch(URL + "post/addPost", {
    method: "POST",
    body: data,
  });
  let responseData = await response.json();
  return responseData.response;
};

const useInsertPost = (onSuccessFunctions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => await insertPost(data),
    onSuccess: () => {
      onSuccessFunctions();
      queryClient.invalidateQueries({ queryKey: ["trending"] });
      queryClient.invalidateQueries({ queryKey: ["forYou"] });
      queryClient.invalidateQueries({ queryKey: ["pagePost"] });
      queryClient.invalidateQueries({ queryKey: ["friend"] });
      queryClient.invalidateQueries({ queryKey: ["news"] });
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
      queryClient.invalidateQueries({ queryKey: ["pagePost"] });
      queryClient.invalidateQueries({ queryKey: ["trending"] });
      queryClient.invalidateQueries({ queryKey: ["forYou"] });
      queryClient.invalidateQueries({ queryKey: ["friend"] });
      queryClient.invalidateQueries({ queryKey: ["postList"] });
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
      queryClient.invalidateQueries({ queryKey: ["pagePost"] });
      queryClient.invalidateQueries({ queryKey: ["trending"] });
      queryClient.invalidateQueries({ queryKey: ["friend"] });
      queryClient.invalidateQueries({ queryKey: ["forYou"] });
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetMyPagePostList = (companyId, userId, viewList) => {
  console.log(companyId, userId, viewList, "testapi");
  return useQuery({
    queryKey: ["pagepostList", companyId],
    queryFn: () =>
      fetchData(
        {
          url: URL + "post/getMyPagePost",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ companyId, userId }] }
      ),
    enabled: viewList === "post",
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const usePostUnfollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "pages/unfollowPages",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postprofile"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["followingList"] });
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
  useGetNewsPosts,
  useGetPagePost,
  useGetMyPagePostList,
  useGetMyPagePost,
  usePostUnfollow,
};
