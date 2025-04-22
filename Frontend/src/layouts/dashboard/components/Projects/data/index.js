/* eslint-disable react/prop-types */

// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function data() {
  
  const [datalist, setdatalist] = useState([]);

  useEffect(() => {
    const fetchDatalatestsix = async () => {
      try {
        const response = await axios.get("http://localhost:2000/adminroute/latestsixsubscribers");
        setdatalist(response.data.data);
      } catch (err) {
        console.log(err, "Error getting");
      }
    };

    fetchDatalatestsix();
  }, []);

 

    const Name = ({name}) => (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {name}
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

  return {
    columns: [
      { name: "name", align: "left" },
      { name: "email", align: "left" },
      { name: "phone", align: "center" },
      { name: "location", align: "center" },
    ],

    rows: datalist.map((item)=>({
      name: <Name name={item.username}></Name>,
      email: <Email email={item.email}></Email>,
      phone: <Phonenumber phonenumber={item.phonenumber}></Phonenumber>,
      location:<Location location={item.location} ></Location>

    }))
  };
}
