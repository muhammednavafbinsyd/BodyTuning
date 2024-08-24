/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import axios from "axios";
function UserData({ subscribed, page, limit }) {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [List, setList] = useState([]);
  const [List2, setList2] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const getsubscribeddata = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/subscribedornot`);
        setList2(response.data.subscribedList);
      } catch (err) {
        console.log(err);
      }
    }
    const getusers = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(
          `${BaseUrl}/userroute/getUsers?subscribefilter=${subscribed}&page=${page}&limit=${limit}`
        );
        setList(response.data.getUsers);
        setTotalPages(response.data.totalpages);
      } catch (err) {
        console.log("Error getting subscription", err);
        if (!localStorage.getItem("token")) {
          window.location.replace("/");
        }
      }
    };
    getsubscribeddata();
    getusers(subscribed, page, limit, totalPages);
  }, [subscribed, page, limit, totalPages]);
  ;
  const Username = ({  username }) => (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {username}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
  const Email = ({ email }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {email}
      </SoftTypography>
    </SoftBox>
  );
  const Phonenumber = ({ phonenumber }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {phonenumber}
      </SoftTypography>
    </SoftBox>
  );
  const Location = ({ location }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {location}
      </SoftTypography>
    </SoftBox>
  );
  const Country = ({ country }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {country}
      </SoftTypography>
    </SoftBox>
  );
  const Status = ({ status }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {status}
      </SoftTypography>
    </SoftBox>
  );

  const Type = ({ type }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {type}
      </SoftTypography>
    </SoftBox>
  );
  const NO = ({ no }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {no}
      </SoftTypography>
    </SoftBox>
  );
  const SubscriptionStatus = ({ user }) => {
    const userStatuses = List2.filter((status) => status.userID === user._id);
    if (userStatuses.length > 0) {
      userStatuses.sort((a, b) => new Date(b.expiry_date) - new Date(a.expiry_date));
      const latestStatus = userStatuses[0];
      if (latestStatus.status === "active") {
        return (     
          <SoftBox display="flex" flexDirection="column">
            <Status status="Subscribe" />
          </SoftBox>
        );
      } else {
        <SoftBox display="flex" flexDirection="column">
          <Status status="Not Subscribed" />
        </SoftBox>;
      }
    } else {
      return (
        <SoftBox display="flex" flexDirection="column">
          <Status status="Not Subscribed" />
        </SoftBox>
      );
    }
  };
  return {
    columns: [
      { name: "no", align: "center" },
      { name: "username", align: "left" },
      { name: "email", align: "left" },
      { name: "phonenumber", align: "center" },
      { name: "location", align: "center" },
      { name: "country", align: "center" },
      { name: "status", align: "center" },
      { name: "type", align: "center" },
    ],
    rows: List.map((item,index) => ({
      no: <NO key={index} no={(page - 1) * limit + index + 1}></NO>,
      username: <Username username={item.username} />,
      email: <Email email={item.email} />,
      phonenumber: <Phonenumber phonenumber={item.phonenumber} />,
      location: <Location location={item.location} />,
      country: <Country country={item.country} />,
      status: <SubscriptionStatus user={item} />,
      type: <Type type={item.type} />,
    })),
    totalPages: totalPages,
  };
}
export default UserData;
