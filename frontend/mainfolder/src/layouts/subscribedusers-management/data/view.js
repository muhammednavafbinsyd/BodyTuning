import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

function view() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  useEffect(() => {
    const packageview = async (id) => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/pakageView/${id}`);
        setList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const packageDetails = async (pid) => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/subscriptionsedit/${pid}`);
        setList2(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    packageview(id);
    packageDetails(list.packageId);
  }, [id, list.packageId]);
  return (
    <BasicLayout>
      <Row>
        <Col className="col-4" style={{ position: "relative", right: "17rem" }}>
          <Card style={{ width: "23rem" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: "1.5rem" }}> Subscribed package</Card.Title>
              <Card.Text>
                <h5>{list2.membershiptype}</h5>
                <p>{list2.duration}</p>
                <p>monthlyfee {list2.monthlyfee}</p>
                <p>OTEF {list2.onetimeentrollmentfee}</p>
                <p>{list2.additionalbenefits}</p>
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-4">
          <Card style={{ width: "26rem" }}>
            <Card.Body>
              <Card.Title>Billing details</Card.Title>
              <Card.Text>
                <h5>
                  Name: <span style={{ fontSize: "medium" }}>{list.username}</span>
                </h5>
                <h5>
                  Email: <span style={{ fontSize: "medium" }}>{list.email}</span>
                </h5>
                <h5>
                  Contact: <span style={{ fontSize: "medium" }}>{list.phonenumber}</span>
                </h5>
                <h5>
                  Location: <span style={{ fontSize: "medium" }}> {list.location}</span>
                </h5>
                <h5>
                  Country : <span style={{ fontSize: "medium" }}>{list.country}</span>{" "}
                </h5>
                <h5>
                  PIN : <span style={{ fontSize: "medium" }}>{list.pin}</span>
                </h5>
                {list.type === "subscribe" && <p>Amount total paid : {list.totalpaid}</p>}
                {list.type === "upgrade" && <p>Total amount:{list.totalpaid}</p>}
                {list.type === "upgrade" && (
                  <p>Blance paid:{list.type === "upgrade" ? list.balanceAmount : ""}</p>
                )}
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </BasicLayout>
  );
}

export default view;
