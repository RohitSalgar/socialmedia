import { toast } from "react-toastify";
import { URL } from "../config";

export const saveregistration = async (data) => {
	try {
		const response = await fetch(URL+"users/userRegister", {
			method: "POST",
			body: JSON.stringify({ data: [{
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                designation: data.designation,
                state: data.state,
                dob: data.dob,
                country: data.country,
                // files:data.files,
            }] }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJson = await response.json();
		if (responseJson.status === 0) {
			toast.error(responseJson.message);
			throw new Error(responseJson.response);
		}
		return responseJson;
	} catch (error) {
		toast.error(error.message);
		throw new Error(error.message);
	}
};
