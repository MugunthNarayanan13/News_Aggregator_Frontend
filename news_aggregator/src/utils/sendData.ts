import axios from "axios";
import {toast} from "react-toastify";

const BASE_BACKEND_URL = "http://localhost:5000/api/users";

const sendData = async function(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body: {} = {}) {
  const completeUrl = BASE_BACKEND_URL+url;
  try {
    let response;

    switch (method) {
      case "GET":
        response = await axios.get(completeUrl);
        break;
      case "POST":
        response = await axios.post(completeUrl, body);
        break;
      case "PUT":
        response = await axios.put(completeUrl, body);
        break;
      case "DELETE":
        response = await axios.delete(completeUrl);
        break;
      default:
        throw new Error("Invalid method");
    }

    if(response.status == 200) {
      toast.success("Successful");
    } else if(response.status == 400){
      toast.error(response.data);
    } else if (response.status == 500) {
      toast.error("Internal server error");
    } else {
      toast.error(response.data);
    }
    return {data: response.data, status: response.status};
  
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || "Something went wrong!";
      console.log("Axios Error:", errorMessage);
      toast.error(errorMessage);
    } else {
      console.log("Unexpected Error:", error);
      toast.error("An unexpected error occurred!");
    }
    return {data: null, status: 500}; // Return null to indicate failure
  }
}

export {sendData}