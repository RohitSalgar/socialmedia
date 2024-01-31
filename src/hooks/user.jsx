import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";


const useGetAllFrdRequestByUserId = (id) => {
    return useQuery({
        queryKey: ["allFrdRequests", id],
        queryFn: ({queryKey}) =>
          { 
            return fetchData({
                url: URL + "users/getConnectionRequestListById",
                isAuthRequired: true,
                method: "POST"
            },
            { data: [{ id: queryKey[1] }] })},
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        }
        });
};

const useChangeConnectionStatus = (onSuccessFunctions) => {
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
        onSuccess: (data) => {
            onSuccessFunctions(data)
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.invalidateQueries({ queryKey: ["followingList"] });
            queryClient.invalidateQueries({ queryKey: ["allFrdRequests"] });
            queryClient.invalidateQueries({ queryKey: ["allFrdRequests"] });
            queryClient.invalidateQueries({ queryKey: ["mainUserfollowList"] });
            queryClient.invalidateQueries({ queryKey: ["mainUserfollowingList"] });
            queryClient.invalidateQueries({ queryKey: ["mainUserconnectionList"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useSendFrdRequest = (onSuccessFunctions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "users/userConnectionRequest",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: (data) => {
            onSuccessFunctions(data)
            queryClient.invalidateQueries({ queryKey: ["trending"] });
            queryClient.invalidateQueries({ queryKey: ["forYou"] });
            queryClient.invalidateQueries({ queryKey: ["pagePost"] });
            queryClient.invalidateQueries({ queryKey: ["friend"] });
            queryClient.invalidateQueries({ queryKey: ["allFrdRequests"] });
            queryClient.invalidateQueries({ queryKey: ["mainUserfollowList"] });
            queryClient.invalidateQueries({ queryKey: ["mainUserfollowingList"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};



const useNavSearch = (onSuccessFunctions) => {
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "users/navSearch",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: (data) => {
            console.log(data,"data in hook")
            onSuccessFunctions(data)
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useGetAllTopPages = () => {
    return useQuery({
      queryKey: ["getAllTopPages"],
      queryFn: () => {
        return fetchData({
          url: URL + "pages/getCompanyDataByFollowersDescending",
          isAuthRequired: true,
        });
      },
    });
  };

  const useFollowTopPage = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) =>
        fetchData(
          {
            url: URL + "pages/pageFollow ",
            method: "POST",
            isAuthRequired: true,
          },
          { data: [data] }
        ),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["getAllTopPages"] });
        toast.success(data)
      },
      onError: (error) => {
        toast.error(error.message.split(":")[1]);
      },
    });
  };

export { useFollowTopPage,useGetAllTopPages, useGetAllFrdRequestByUserId, useChangeConnectionStatus, useNavSearch, useSendFrdRequest };
