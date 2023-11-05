"use client";
import axios from "axios";
import { useState } from "react";

function useGetOnboardUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getOtpApi = async ({ data: funcData, endPoint }) => {
    try {
      setLoading(true);
      setData(null);
      const res = await axios({
        method: "post",
        url: `http://localhost:8000/${endPoint}`,
        data: funcData,
      });
      setData(res?.data);
      console.log(res);
    } catch (error) {
      setData(error?.response?.data);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getOtpApi,
    data,
    loading,
  };
}

export default useGetOnboardUser;
