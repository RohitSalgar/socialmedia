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
            queryclient.invalidateQueries(['schedules'])
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};
const useDeleteSchedule = () => {
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
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};


const useGetAllMySchedules = (id) => {
    return useQuery({
        queryKey: ['schedules', id],
        queryFn: () => {
            return fetchData({
                url: URL + "schedule/getMySchedule",
                method: "POST",
                isAuthRequired: true
            }, {
                data: [{ companyId: id }]
            },

            )

        },
    })
}

export { useAddSchedule, useDeleteSchedule, useGetAllMySchedules }