import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";
import { useDispatch } from "react-redux";
import { setSideView } from "../redux/slices/profileSlice";

const createCompany = async (data) => {
  let response = await fetch(URL + "pages/addCompanyPages", {
    method: "POST",
    body: data,
  });
  let responseData = await response.json();
  if (responseData.status === 1) {
    return responseData.response;
  } else {
    toast.error("Email Already Exists");
  }
  throw new Error("Email Already Exists");
};

const useCreateCompany = () => {
  const queryClient = useQueryClient();
  const dispath = useDispatch();
  return useMutation({
    mutationFn: (data) => createCompany(data),
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
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

export { useCreateCompany, useGetCompanyProfile, useGetPageFollowList };
