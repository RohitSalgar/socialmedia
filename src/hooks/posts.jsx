import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";
import { useSelector } from "react-redux";
import { PAGE_SIZE } from "../config";

const useGetHashTagPosts = (hashtag) => {
  return useInfiniteQuery({
    queryKey: ["hashtagPosts", hashtag],
    queryFn: ({ pageParam, queryKey }) => {
      return fetchData(
        {
          url: URL + "post/getPostByHashtag",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ page: pageParam, pageSize: 5, hashTags: [queryKey[1]] }] }
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
    enabled: hashtag !== "",
  });
};

const useGetTrendingPosts = (tabView) => {
  return useInfiniteQuery({
    queryKey: ["trending"],
    queryFn: ({ pageParam }) => {
      return fetchData(
        {
          url: URL + "post/getTrendingPost",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ page: pageParam, pageSize: PAGE_SIZE, hashTags: "" }] }
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
    enabled: tabView === "trending" || tabView === "forYou",
  });
};

const useGetSkipTrendingPosts = () => {
  return useQuery({
    queryKey: ["publictrending"],
    queryFn: () => {
      return fetchData({
        url: URL + "post/getTrendingPost",
        isAuthRequired: true,
      });
    },
  });
};

const useGetPagePost = (tabView) => {
  return useInfiniteQuery({
    queryKey: ["pagePost"],
    queryFn: ({ pageParam }) => {
      return fetchData(
        {
          url: URL + "post/getPagePost",
          isAuthRequired: true,
          method: "POST",
        },
        { data: [{ page: pageParam, pageSize: PAGE_SIZE, hashTags: "" }] }
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
    enabled: tabView === "pages",
  });
};

const useGetNewsPosts = (tabView) => {
  return useInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam }) => {
      return fetchData(
        {
          url: URL + "post/getAllNews",
          isAuthRequired: true,
          method: "POST",
        },
        {
          data: [{ page: pageParam, pageSize: PAGE_SIZE, hashTags: "" }],
        }
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
    enabled: tabView === "news",
  });
};

const useGetFriendsPost = (tabView, payload, onSuccess) => {
  return useInfiniteQuery({
    queryKey: ["friend"],
    queryFn: ({ pageParam }) =>
      fetchData(
        {
          url: URL + "post/getFriendsPost",
          method: "POST",
          isAuthRequired: true,
        },
        {
          data: [
            { ...payload, page: pageParam, pageSize: PAGE_SIZE, hashTags: "" },
          ],
        }
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
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
  return useInfiniteQuery({
    queryKey: ["forYou"],
    queryFn: ({ pageParam }) =>
      fetchData(
        {
          url: URL + "post/getForYouPost",
          method: "POST",
          isAuthRequired: true,
        },
        {
          data: [
            { ...payload, page: pageParam, pageSize: PAGE_SIZE, hashTags: "" },
          ],
        }
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    enabled: tabView === "forYou" || tabView === "trending",
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
      queryClient.invalidateQueries({ queryKey: ["notification"] });

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
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["notification"] });
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
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["postprofile"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["followingList"] });
      queryClient.invalidateQueries({ queryKey: ["followList"] });
      queryClient.invalidateQueries({ queryKey: ["getAllTopPages"] });
      queryClient.invalidateQueries({ queryKey: ["companyprofile"] });
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
  useGetSkipTrendingPosts,
  useGetHashTagPosts,
};
