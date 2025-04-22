import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import BasicLayout from "layouts/authentication/components/BasicDemoLayout";
import { Form, useParams } from "react-router-dom";
function editblog() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const { id } = useParams();
  const [editblog, seteditblog] = useState({
    image: null,
    title: "",
    description: "",
  });
  const [error1, seterror1] = useState("");
  const [error2, seterror2] = useState("");
  const [error3, seterror3] = useState("");
  useEffect(() => {
    const blogedit = async (id) => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/blogedit/${id}`);
        seteditblog(response.data);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      }
    };
    blogedit(id);
  }, [id]);
  const handleUpdate = (e) => {
    e.preventDefault();
    const validationErrors = [];
    if (!editblog.image) {
      seterror1("image rquired");
      validationErrors.push("image rquired");
    } else {
      seterror1(null);
    }
    if (!editblog.title) {
      seterror2("title required");
      validationErrors.push("title required");
    } else {
      seterror2(null);
    }
    if (!editblog.description) {
      seterror3("description required");
      validationErrors.push("description required");
    } else {
      seterror3(null);
    }
    if (validationErrors.length === 0) {
      const data = new FormData();
      data.append("image", editblog.image);
      data.append("title", editblog.title);
      data.append("description", editblog.description);

      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;

      axios
        .put(`${BaseUrl}/adminroute/updateblog/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            window.location.href = "/Blogs"
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      null;
    }
  };
  const config = {
    init: () => {
      (selector = "Editor"),
        (plugins = "lists"),
        (toolbar = config.toolbar),
        (menu = { tools: { title: "Tools", items: "listprops" } });
    },
    toolbar: "bullist numlist | undo redo",
  };
  tinymce.init({
    selector: "editor",
    plugins: "lists",
    toolbar: config.toolbar,
  });
  const example_image_upload_handlertyne = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open("POST", `${BaseUrl}/adminroute/tinymceImageUpload`);
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
        reject("Image upload failed due to a XHR Transport error. Code: " + xhr.status);
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
      "image",
      "lists",
      "code",
      // Include the image plugin
    ],
    toolbar: "bullist numlist image",
    menu: { tools: { title: "Tools", items: "listprops" } },
    image_advtab: true,
    image_uploadtab: true,
    // images_upload_url: 'http://localhost:2000/adminroute/tinymceImageUpload',
    images_upload_handler: example_image_upload_handlertyne,
    images_upload_base_path: `${BaseUrl}/`,
  };
  return (
    <BasicLayout>
      <Row>
        <Col>
          <input
            type="file"
            required
            onChange={(e) => seteditblog({ ...editblog, image: e.target.files[0] })}
          />
          <p>{error1}</p>
          <input
            type="text"
            placeholder="Title"
            required
            value={editblog.title}
            onChange={(e) => seteditblog({ ...editblog, title: e.target.value })}
          />
          <p>{error2}</p>
          <Editor
            initialValue={editblog.description}
            init={editorConfig}
            onEditorChange={(content) => seteditblog({ ...editblog, description: content })}
          />
          <p>{error3}</p>
        </Col>
        <Button onClick={handleUpdate}>Update</Button>
      </Row>
    </BasicLayout>
  );
}
export default editblog;
