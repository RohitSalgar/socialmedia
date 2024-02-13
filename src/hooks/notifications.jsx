import { useMutation, useQuery, useQueryClient,useInfiniteQuery } from "@tanstack/react-query";
import { fetchData } from "../helper";
import { toast } from "react-toastify";
import { PAGE_SIZE, URL } from "../config";

const useGetAllNotificationById = (id) => {
  return useInfiniteQuery({
    queryKey: ["notification", id],
    queryFn: ({ pageParam }) =>{
      return fetchData(
        {
          url: URL + "users/getMyNotifications",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{page: pageParam, pageSize:PAGE_SIZE, userId: id }] }
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetAllPostTagNotificationById = (userName) => {
  return useInfiniteQuery({
    queryKey: ["postTagnotification", userName],
    queryFn: ({ pageParam }) =>{
      return fetchData(
        {
          url: URL + "post/getPostMentionNotification",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{page: pageParam, pageSize:PAGE_SIZE, userName: userName }] }
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useUpdateNotificationStatus = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "users/updateNotification",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryclient.invalidateQueries(["notification"]);
      queryclient.invalidateQueries(["postTagnotification"]);
    },
  });
};

const useGetNotificationPostById = (id) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "post/getPostById",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ postId: id }] }
      ),
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
    enabled: id !== "",
  });
};

export {
  useGetAllNotificationById,
  useUpdateNotificationStatus,
  useGetNotificationPostById,
  useGetAllPostTagNotificationById,
};
