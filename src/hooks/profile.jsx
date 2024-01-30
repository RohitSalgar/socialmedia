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
      enabled:id !== null,
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const editProfile = async (data) => {
  let response = await fetch(URL + "users/updateUserDetails", {
    method: "POST",
    body: data,
  });
  let responseData = await response.json();
  return responseData.response;
};
const useEditProfile = (onSuccessFunctions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
    editProfile(data),
    onSuccess: (data) => {
      console.log("sdfsdf")
      onSuccessFunctions(data)
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
const useGetUserFollowList = (id) => {
  return useQuery({
    queryKey: ["mainUserfollowList", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "users/getFollowListByUserId",
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
const useGetMainUserFollowingList = (id) => {
  return useQuery({
    queryKey: ["mainUserfollowingList", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "users/getFollowingListByUserId",
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
const useGetMainUserConnectionList = (id) => {
  return useQuery({
    queryKey: ["mainUserconnectionList", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "users/getConnectionListByUserId",
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
      queryClient.invalidateQueries({ queryKey: ["allFrdRequests"] });
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
  useGetMainUserFollowingList,
  useGetUserFollowList,
  useGetMainUserConnectionList
};
