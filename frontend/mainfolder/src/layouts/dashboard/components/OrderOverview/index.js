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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect, useState } from "react";
import axios from "axios";

function OrdersOverview() {
  const [datalist, setdatalist] = useState([])
  const [membershipdata, setmembershipdata] = useState([])



  useEffect(() => {
    const fetchDatalatestsix = async () => {
      try {
        const response = await axios.get("http://localhost:2000/adminroute/latestsixsubscribers");
        setdatalist(response.data.data);
      } catch (err) {
        console.log(err, "Error getting");
      }
    };

    const fetchsubscription = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get("http://localhost:2000/adminroute/getSubscription");
        setmembershipdata(response.data);
        console.log(response.data, "4848");
      } catch (err) {
        console.log(err, "Error getting");
      }
    };

    fetchsubscription();
    fetchDatalatestsix();
  }, []);
  

  const getMembershipTypeByPackageId = (packageId) => {
    const subscription = membershipdata.find((item) => item._id === packageId);
    return subscription ? subscription.membershiptype || "Unknown" : "Unknown";

  };


  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Orders overview
        </SoftTypography>
        <SoftBox mt={1} mb={2}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ fontWeight: "bold", color: ({ palette: { success } }) => success.main }}>
                arrow_upward
              </Icon>
            </SoftTypography>
            &nbsp;
            <SoftTypography variant="button" color="text" fontWeight="medium">
              24%
            </SoftTypography>{" "}
            this month
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        {datalist.map((item, index) => {
          const createdAtDate = new Date(item.createdAt);

          const date = createdAtDate.getDate();
          const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            createdAtDate
          );
          const Time = createdAtDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const dateTimeString = `${date} ${monthName} ${Time}`;

          return (
            <TimelineItem
              key={index}
              color="success"
              title={`${item.username} subscribed is ${getMembershipTypeByPackageId(item.packageId)}`}              dateTime={dateTimeString}
              
            />
            
          );
        })}
      </SoftBox>
    </Card>
  );
}

export default OrdersOverview;
