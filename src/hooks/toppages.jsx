import { useState, useEffect } from "react";
import { URL } from "../config";

const useGetTopPages = () => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          URL + "pages/getCompanyDataByFollowersDescending"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch company data");
        }
        const responseData = await response.json();
        const parsedData = JSON.parse(responseData.data);
        setCompanyData(parsedData);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchCompanyData();
  }, []);

  return companyData;
};

async function useFollowPage(data) {
  try {
    const response = await fetch(URL + "pages/pageFollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export { useGetTopPages, useFollowPage };
