import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../helper";
import { toast } from "react-toastify";
import { URL } from "../config";

const useGetAllNotificationById = (id) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "users/getMyNotifications",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ userId: id }] }
      ),
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetAllPostTagNotificationById = (id) => {
  return useQuery({
    queryKey: ["postTagnotification", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "post/getPostTagNotification",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ userId: id }] }
      ),
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
  useGetAllPostTagNotificationById
};
