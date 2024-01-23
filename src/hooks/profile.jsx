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
    onSuccess: (data) => {
      console.log(data, "query");
    },
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

export { useGetProfile, useEditProfile };
