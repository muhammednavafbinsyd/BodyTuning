/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================
* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
function GradientLineChart() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [data, setdata] = useState([]);
useEffect(()=>{
const fetchSales = async()=>{
  try{
     const response = await axios.get(`${BaseUrl}/adminroute/fetchsalesGraph`)
     
     const currentYear = new Date().getFullYear();
     if (Array.isArray(response.data)) {
      const currentYearData = response.data.filter(item => item._id.year === currentYear);
      setdata(currentYearData);
    } else {
      console.error("data error");
    }
  }catch (err){
    console.log("Error")
  }
}
fetchSales()
},[])
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const labels = monthNames.slice(0, new Date().getMonth() + 1);
  const dataValues = Array(labels.length).fill(0);
  data.forEach(item => {  
    const monthIndex = item._id.month-1; 
    dataValues[monthIndex] += item.totalAmount;
  });
  const gradientLineChartData = {
    labels: labels ,
    datasets: [
      {
        label: "Sales",
        color: "info",
        data: dataValues,
      },
    ],
  };
return gradientLineChartData;
}
export default GradientLineChart

