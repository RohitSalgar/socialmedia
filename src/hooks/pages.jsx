import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";
import { useDispatch } from "react-redux";
import { setSideView } from "../redux/slices/profileSlice";

const useCreateCompany = () => {
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
      console.log("test");
      dispath(setSideView("pagesotp"));
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

export { useCreateCompany };
