/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import BasicLayout from "layouts/authentication/components/BasicDemoLayout";
import { useParams } from "react-router-dom";
function blogview2() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const { id } = useParams("");
  const [list, setlist] = useState([]);
  useEffect(() => {
    const viewblog = async (id) => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/viewblog/${id}`);
        setlist(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    viewblog(id);
  }, [id]);
  return (
    <BasicLayout>
      <section className="container">
        <div dangerouslySetInnerHTML={{ __html: list.description }}></div>
      </section>
    </BasicLayout>
  );
}
export default blogview2;
