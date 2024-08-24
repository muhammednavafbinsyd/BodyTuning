import React, { useState ,useEffect } from "react";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { Editor } from "@tinymce/tinymce-react";
import SoftBox from "components/SoftBox";
import { Height } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import SoftButton from "components/SoftButton";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import SoftInput from "components/SoftInput";
import BasicLayout from "layouts/authentication/components/BasicDemoLayout";
import { Col, Row } from "react-bootstrap";

function Addplan() {
  const quillRef = React.useRef();
  const { id } = useParams();
  const [types,settypes]= useState();
  const [day1, setDay1] = useState("");
  const [day2, setDay2] = useState("");
  const [day3, setDay3] = useState("");
  const [day4, setDay4] = useState("");
  const [day5, setDay5] = useState("");
  const [day6, setDay6] = useState("");
  const [day7, setDay7] = useState("");
  const [title, setTitle] = useState("");


  const handlesubmit = async (e) => {
    e.preventDefault();

    const formData = {
      trainerId: id,
      type: types,
      title: title,
      day1: day1,
      day2: day2,
      day3: day3,
      day4: day4,
      day5: day5,
      day6: day6,
      day7: day7,
    };

    
    try {
      const response = await axios.post("http://localhost:2000/adminroute/workoutpost",formData, {
      
      });

      window.location.href = `/workoutplan/${id}`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  const quillStyle = {
    display: "block",
    justifyContent: "space-evenly",
    margin: "20px",
    width: "600px",
    height: "400px",
  };
  const btn = {
    display: "block",
    justifyContent: "space-between",
    margin: "20px",
    width: "20rem",
  };

  const  containerStyle2= {
    display: "flex",
    justifyContent: "center",
    marginLeft: "10rem",
  };

  const example_image_upload_handler = (blobInfo) => {
    return blobInfo;
  };

  const openFilePicker = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = (event) => {
      // Handle file selection here
      return URL.createObjectURL(event.target.files[0]);
    };
    input.click();
  };
  const example_image_upload_handlertyne = (blobInfo,progress) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open("POST", "http://localhost:2000/adminroute/tinymceImageUpload");

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: "HTTP Error: " + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != "string") {
          reject("Invalid JSON: " + xhr.responseText);
          return;
        }

        resolve(json.location);
      };

      xhr.onerror = () => {
        reject("Image upload failed due to a XHR Transport error.Code: " + xhr.status);
      };

      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });
  const editorConfig = {
    // ... (other config options)
    apiKey: "3sbxiwem8u0h6sbro031h6f4rpgr52p2sxff3d2pzsf8uahg",
    plugins: [
      // ... (other plugins)
      "image","lists", "code"// Include the image plugin
    ],
    toolbar: "bullist numlist image" ,
    menu: { tools: { title: 'Tools', items: 'listprops' }},
    // toolbar: "image",
    image_advtab: true,
    image_uploadtab: true,
    // images_upload_url: 'http://localhost:2000/adminroute/tinymceImageUpload',
    images_upload_handler: example_image_upload_handlertyne,
    images_upload_base_path: "http://localhost:2000/",
  };
  const [type,settype] = useState([]);



  
  const typeofplan = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get("http://localhost:2000/adminroute/plantypeGet");
      settype(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    typeofplan();
  }, []);

  return (
    <BasicLayout>
      <Row>
      <select name="type" onChange={(e) => settypes(e.target.value)}>
                {type.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.type}
                  </option>
                ))}
              </select>
        <Col>
          <SoftBox mb={6}>
            <label>Title</label>
            <Editor
              // modules={modules}
              init={editorConfig}
              style={{ width: "350px", height: "200px" }}
              theme="snow"
              name="title"
              value={title}
              onEditorChange={(content, editor) => setTitle(content)}
            />
          </SoftBox>
        </Col>
        <Col>
          <SoftBox mb={3}>
          <label>Monday</label>
            <Editor
              init={editorConfig}
              // modules={modules}
              style={quillStyle}
              theme="snow"
              name="day1"
              value={day1}
              onEditorChange={(content, editor) => setDay1(content)}
            />
          </SoftBox>
        </Col>
        <Col>
          <SoftBox mb={3}>
          <label>Tuesday</label>
            <Editor
              init={editorConfig}
              // modules={modules}
              style={quillStyle}
              theme="snow"
              value={day2}
              onEditorChange={(content, editor) => setDay2(content)}
            />
          </SoftBox>
        </Col>
        <Col>
          <SoftBox mb={3}>
          <label>Wenesday</label>
            <Editor
              init={editorConfig}
              // modules={modules}
              style={quillStyle}
              theme="snow"
              value={day3}
              placeholder="Day 3"
              onEditorChange={(content, editor) => setDay3(content)}
            />
          </SoftBox>
        </Col>
      </Row>
      <Row>
        <Col>
        <SoftBox mb={3}>
        <label>Thursday</label>
        <Editor
          init={editorConfig}
          // modules={modules}
          style={quillStyle}
          theme="snow"
          value={day4}
          onEditorChange={(content, editor) => setDay4(content)}
        />
      </SoftBox>
        </Col>
        <Col>
        <SoftBox mb={3}>
        <label>Friday</label>
        <Editor
          init={editorConfig}
          // modules={modules}
          style={quillStyle}
          theme="snow"
          value={day5}
          onEditorChange={(content, editor) => setDay5(content)}
        />
      </SoftBox>
        </Col>
        <Col>
        <SoftBox mb={3}>
        <label>Saturday</label>
        <Editor
          init={editorConfig}
          // modules={modules}
          style={quillStyle}
          theme="snow"
          value={day6}
          onEditorChange={(content, editor) => setDay6(content)}
        />
      </SoftBox>
        </Col>
        <Col>
        <SoftBox mb={3}>
        <label>Sunday</label>
        <Editor
          init={editorConfig}
          // modules={modules}
          style={quillStyle}
          theme="snow"
          value={day7}
          onEditorChange={(content, editor) => setDay7(content)}
        />
      </SoftBox>
        </Col>
      </Row>
      <SoftBox style={containerStyle2}>

        <SoftBox mb={3}>
          <Button variant="contained" style={btn} onClick={handlesubmit}>
            ADD
          </Button>
        </SoftBox>
        <SoftBox mb={3}>
          <Button variant="" style={btn}>
            Cancel
          </Button>
        </SoftBox>

        </SoftBox>
  
    </BasicLayout>
  );
}

export default Addplan;
