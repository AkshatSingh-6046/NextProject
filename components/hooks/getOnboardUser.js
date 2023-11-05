"use client";
import axios from "axios";
import { useState } from "react";

function useGetOnboardUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getOnboardApi = async ({ data: funcData, endPoint }) => {
    try {
      setData(null);
      setLoading(true);
      const res = await axios({
        method: "post",
        url: `http://localhost:8000/${endPoint}`,
        data: funcData,
      });

      setData(res?.data);
    } catch (error) {
      setData(error?.response?.data || error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    getOnboardApi,
    data,
    loading,
  };
}

export default useGetOnboardUser;
