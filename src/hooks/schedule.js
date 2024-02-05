import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../helper";
import { URL } from "../config";
import { toast } from "react-toastify";

const useAddSchedule = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "schedule/addSchedule",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryclient.invalidateQueries(["schedules"]);
      queryclient.invalidateQueries(["allschedules"]);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useDeleteSchedule = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "schedule/deleteSchedule",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryclient.invalidateQueries(["schedules"]);
      queryclient.invalidateQueries(["allschedules"]);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};
const useDeletescheduleReply = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "schedule/deleteReply",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryclient.invalidateQueries(["schedules"]);
      queryclient.invalidateQueries(["allschedules"]);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};
const useDeletescheduleComments = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "schedule/deleteComment",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryclient.invalidateQueries(["schedules"]);
      queryclient.invalidateQueries(["allschedules"]);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useUpdateScheduleLikes = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "schedule/updateScheduleLike",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryclient.invalidateQueries(["schedules"]);
      queryclient.invalidateQueries(["allschedules"]);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};
const useUpdatePostComment = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "schedule/postComment",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryclient.invalidateQueries(["schedules"]);
      queryclient.invalidateQueries(["allschedules"]);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useReplyPostComment = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchData(
        {
          url: URL + "schedule/postReply",
          method: "POST",
          isAuthRequired: true,
        },
        { data: [data] }
      ),
    onSuccess: () => {
      queryclient.invalidateQueries(["schedules"]);
      queryclient.invalidateQueries(["allschedules"]);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetAllMySchedules = (id) => {
  return useQuery({
    queryKey: ["schedules", id],
    queryFn: () => {
      return fetchData(
        {
          url: URL + "schedule/getMySchedule",
          method: "POST",
          isAuthRequired: true,
        },
        {
          data: [{ companyId: id }],
        }
      );
    },
  });
};

const useGetAllMyCommentAndReply = (id) => {
  return useQuery({
    queryKey: ["schedules", id],
    queryFn: () => {
      return fetchData(
        {
          url: URL + "schedule/getCommentAndReply",
          method: "POST",
          isAuthRequired: true,
        },
        {
          data: [{ scheduleId: id }],
        }
      );
    },
  });
};

const useGetAllSchedules = () => {
  return useQuery({
    queryKey: ["allschedules"],
    queryFn: () => {
      return fetchData({
        url: URL + "schedule/getAllSchedule",
        method: "GET",
        isAuthRequired: true,
      });
    },
  });
};

export {
  useGetAllSchedules,
  useAddSchedule,
  useDeletescheduleComments,
  useReplyPostComment,
  useDeleteSchedule,
  useDeletescheduleReply,
  useUpdatePostComment,
  useGetAllMySchedules,
  useGetAllMyCommentAndReply,
  useUpdateScheduleLikes,
};
