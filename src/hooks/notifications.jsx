import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../helper";
import { toast } from "react-toastify";
import { URL } from "../config";

const useGetAllNotificationById = (id) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "",
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

export { useGetAllNotificationById };
