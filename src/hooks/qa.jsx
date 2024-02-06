import { PAGE_SIZE, URL } from "../config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchData } from "../helper";
import { useInfiniteQuery } from "@tanstack/react-query";
const Askqa = async (data) => {
  let response = await fetch(URL + "qa/askQuestion", {
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
      queryClient.invalidateQueries({ queryKey: ["qa"] });
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetAllQa = (tabView) => {
  return useInfiniteQuery({
      queryKey: ["qa"],
      queryFn: ({pageParam}) => {
          return fetchData({
              url: URL + "qa/getAllQa",
              isAuthRequired: true,
              method: "POST"
          }, {
            data: [{ page: pageParam, pageSize:PAGE_SIZE , hashTags:""}]
          });
      },
      initialPageParam:1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 0 ? null : allPages.length + 1
      },
      enabled: tabView === "qa",
  });
};

const useDeleteQa = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: (data) =>
          fetchData(
              {
                  url: URL + "qa/deleteQuestion",
                  method: "POST",
                  isAuthRequired: true,
              },
              { data: [data] }
          ),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["qa"] });
      },
      onError: (error) => {
          toast.error(error.message.split(":")[1]);
      },
  });
};



const useGetQaComment = (id) => {
  return useQuery({
    queryKey: ["qaComment", id],
    queryFn: () =>
      fetchData(
        {
          url: URL + "qa/getAnswersAndReplies",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [{ questionId: id }] }
      ),
    enabled: !!id,
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useQaLikeDisLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "qa/updateQuestionLike",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qa"] });

    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useInsertQaComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "qa/postAnswer ",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["qa"] });
      queryClient.invalidateQueries({ queryKey: ["qaComment"] });

    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useInsertQaReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "qa/postReply",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["qa"] });
      queryClient.invalidateQueries({ queryKey: ["qaComment"] });
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useDeleteQaComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "qa/deleteAnswer",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["qa"] });
      queryClient.invalidateQueries({ queryKey: ["qaComment"] });

    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useDeleteQaReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "qa/deleteReply",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["qa"] });
      queryClient.invalidateQueries({ queryKey: ["qaComment"] });

    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};


export { useInsertquestion, useGetAllQa, useDeleteQa, useInsertQaComment, useQaLikeDisLike, useGetQaComment, useDeleteQaComment, useInsertQaReply, useDeleteQaReply}