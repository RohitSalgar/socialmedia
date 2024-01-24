import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";

const useGetProfile = (id) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "users/getProfileById",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ id }] }
      ),
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};
const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "users/updateUserDetails",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};
const useGetFollowList = (id, viewList) => {
  return useQuery({
    queryKey: ["followList", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "users/getFollowListByUserId",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ id }] }
      ),
    enabled: viewList === "followers",
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};
const useGetFollowingList = (id, viewList) => {
  return useQuery({
    queryKey: ["followingList", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "users/getFollowingListByUserId",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ id }] }
      ),
    enabled: viewList === "following",
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};
const useGetConnectionList = (id, viewList) => {
  return useQuery({
    queryKey: ["connectionList", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "users/getConnectionListByUserId",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ id }] }
      ),
    enabled: viewList === "connection",
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};
const useChangeConnectionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "users/changeConnectionStatus",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["followingList"] });
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

export {
  useGetProfile,
  useEditProfile,
  useGetFollowList,
  useGetFollowingList,
  useGetConnectionList,
  useChangeConnectionStatus,
};
