/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import { Link } from "react-router-dom";
function subscribedUsersTable() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [list, setList] = useState([]);
  useEffect(() => {
    const subscribedUsers = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/Subscribedusers`);
        setList(response.data.subscribedList);
      } catch (err) {
        console.log(err);
        if (!localStorage.getItem("token")) {
          window.location.href = "/";
        }
      }
    };
    subscribedUsers();
  },[]);
  const Name = ({ name }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {name}
      </SoftTypography>
    </SoftBox>
  );
  const Contact = ({ contact }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {contact}
      </SoftTypography>
    </SoftBox>
  );
  const Email = ({ email }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {email}
      </SoftTypography>
    </SoftBox>
  );
  const Pin = ({ pin }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {pin}
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
  const Duration = ({ duration }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {duration}
      </SoftTypography>
    </SoftBox>
  );
  const Monthlyfee = ({ monthlyfee }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {monthlyfee}
      </SoftTypography>
    </SoftBox>
  );
  const OTEF = ({ otef }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {otef}
      </SoftTypography>
    </SoftBox>
  );
  const Totalpaid = ({ totalpaid }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {totalpaid}
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
  return {
    columns: [
      {name: "no", align:"center",},
      { name: "name", align: "center" },
      { name: "contact", align: "center" },
      { name: "email", align: "center" },
      { name: "pin", align: "center" },
      { name: "location", align: "center" },
      { name: "country", align: "center" },
      { name: "duration", align: "center" },
      { name: "monthlyfee", align: "center" },
      { name: "otef", align: "center" },
      { name: "totalpaid", align: "center" },
      {name: "status", align: "center" },
      {name:"type", align: "center" },
      { name: "view", align: "center" },
    ],
    rows: list.map((item,index) => ({
      no: <NO key={index} no={index+1}></NO>,
      name: <Name name={item.username}></Name>,
      contact: <Contact contact={item.phonenumber}></Contact>,
      email: <Email email={item.email}></Email>,
      pin: <Pin pin={item.pin}></Pin>,
      location: <Location location={item.location}></Location>,
      country: <Country country={item.country}></Country>,
      duration: <Duration duration={item.duration}></Duration>,
      monthlyfee: <Monthlyfee monthlyfee={item.monthlyfee}></Monthlyfee>,
      otef: <OTEF otef={item.onetimeentrollmentfee}></OTEF>,
      totalpaid: <Totalpaid totalpaid={item.type === "upgrade" ? item.balanceAmount : item.totalpaid} ></Totalpaid>,
      status:<Status status={item.status}></Status>,
      type: <Type type={item.type}></Type>,
      view: <SoftButton
      color="primary"
      fontWeight="medium"
      variant="text"
       component={Link} to={`/view/${item._id}`}>View</SoftButton>,
    })),
  };
}
export default subscribedUsersTable;
