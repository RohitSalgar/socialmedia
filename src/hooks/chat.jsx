import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../helper";
import { URL } from "../config";

const usegetAllChatInfo = (id) =>
  useQuery({
    queryKey: ["chat", id],
    queryFn: () => {
      return fetchData(
        {
          url: URL + "users/getAllChatInfo",
          method: "POST",
          isAuthRequired: true,
        },
        {
          data: [{ userId: id }],
        }
      );
    },
    refetchInterval: true,
    refetchOnWindowFocus: true,
    enabled: !!id,
  });

const useGetChatById = (connectionId) =>
  useQuery({
    queryKey: ["chatuser", connectionId],
    queryFn: () => {
      return fetchData(
        {
          url: URL + "users/getChatById",
          method: "POST",
          isAuthRequired: true,
        },
        {
          data: [{ connectionId }],
        }
      );
    },
    enabled: !!connectionId,
  });

const useUpdateChatStatus = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "users/updateChatStatus",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryclient.invalidateQueries(["chat"]);
      queryclient.invalidateQueries(["chatuser"]);
    },
  });
};

export { usegetAllChatInfo, useGetChatById, useUpdateChatStatus };
