/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
function SubscribedUsersTable({ selectstartDate, selectendDate, page, limit }) {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    subscribedUsers(selectstartDate, selectendDate, page, limit, totalPages);
  }, [selectstartDate, selectendDate, page, limit, totalPages]);
  const subscribedUsers = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(
        `${BaseUrl}/Subscribedusers?findstartdate=${selectstartDate}&findenddate=${selectendDate}&page=${page}&limit=${limit}`
      );
      setList(response.data.subscribedList);
      setTotalPages(response.data.totalpages);
    } catch (err) {
      console.log(err);
      if (!localStorage.getItem("token")) {
        window.location.href = "/";
      }
    }
  };
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
  const Discount = ({ balanceAmount }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {/* {discount} */}
        {isNaN(balanceAmount) ? "0" : balanceAmount}
      </SoftTypography>
    </SoftBox>
  );
  const Orderdate = ({ orderdate}) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {orderdate} 
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
      { name: "no", align: "center" },
      { name: "name", align: "center" },
      { name: "contact", align: "center" },
      { name: "email", align: "center" },
      { name: "duration", align: "center" },
      { name: "monthlyfee", align: "center" },
      { name: "otef", align: "center" },
      { name: "totalpaid", align: "center" },
      { name: "discount", align: "center" },
      { name: "order date", align: "center" },
      { name: "status", align: "center" },
      { name: "type", align: "center" },
    ],
    rows: list.map((item, index) => ({
      no: <NO key={index} no={(page - 1) * limit + index + 1}></NO>,
      name: <Name name={item.username}></Name>,
      contact: <Contact contact={item.phonenumber}></Contact>,
      email: <Email email={item.email}></Email>,
      duration: <Duration duration={item.duration}></Duration>,
      monthlyfee: <Monthlyfee monthlyfee={item.monthlyfee}></Monthlyfee>,
      otef: <OTEF otef={item.onetimeentrollmentfee}></OTEF>,
      totalpaid: (
        <Totalpaid
          totalpaid={item.type === "upgrade" ? item.balanceAmount : item.totalpaid}
        ></Totalpaid>
      ),
      discount: <Discount balanceAmount={item.previous}></Discount>,
      ["order date"]: (
        <Orderdate
          orderdate={new Date(item.createdAt).toLocaleDateString()}
        ></Orderdate>
      ),
      status: <Status status={item.status}></Status>,
      type: <Type type={item.type}></Type>,
    })),
    totalPages: totalPages,
  };
}
export default SubscribedUsersTable;
