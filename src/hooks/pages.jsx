import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";
import { useDispatch } from "react-redux";
import { setSideView } from "../redux/slices/profileSlice";

const useCreateCompany = () => {
  const queryClient = useQueryClient();
  const dispath = useDispatch();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "pages/addCompanyPages",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      dispath(setSideView("pagesotp"));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetCompanyProfile = (id) => {
  return useQuery({
    queryKey: ["companyprofile", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "pages/getCompanyProfileById",
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

const useGetPageFollowList = (id, viewList) => {
  return useQuery({
    queryKey: ["followList", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "pages/followListByCompanyId",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ companyId: id }] }
      ),
    enabled: viewList === "followers",
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

export { useCreateCompany, useGetCompanyProfile, useGetPageFollowList };
