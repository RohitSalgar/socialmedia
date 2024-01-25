import { URL } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const Askqa =async (data) => {
  let response =await fetch(URL + "qa/askQuestion", {
    method: "POST",
    body: data,
  });
  let responseData = await response.json();
  return responseData.response;
};
const useInsertquestion = (onSuccessFunctions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => await Askqa(data),
    onSuccess: () => {
      onSuccessFunctions();
      queryClient.invalidateQueries({ queryKey: ["forYou"] });
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};
export {useInsertquestion}