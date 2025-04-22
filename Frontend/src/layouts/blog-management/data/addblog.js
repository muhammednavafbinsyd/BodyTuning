import React from "react";
import BasicLayout from "layouts/authentication/components/BasicDemoLayout";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@mui/material";
import { useState } from "react";
function addblog() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [image, setimage] = useState(null);
  const [title, settitle] = useState("");
  const [description, setdescrirption] = useState("");
  const [error1, seterror1] = useState("");
  const [error2, seterror2] = useState("");
  const [error3, seterror3] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    const validationErrors = [];
    if (!image) {
      seterror1("Image required");
      validationErrors.push("Image required");
    } else {
      seterror1(null);
    }
    if (!title) {
      seterror2("Title required");
      validationErrors.push("Image required");
    } else {
      seterror2(null);
    }
    if (!description) {
      seterror3("Description required");
      validationErrors.push("Image required");
    } else {
      seterror3(null);
    }
    if (validationErrors.length === 0) {
      const data = {
        image: image,
        title: title,
        description: description,
      };
      axios
        .post("BaseUrl/adminroute/blogpost", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          window.location.href ="/Blogs"         
        })
        .catch((error) => {
          console.error(error);
        });
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
            accept="image/*"
            type="file"
            required
            onChange={(e) => setimage(e.target.files[0])}
          />
          <p>{error1}</p>
          <input
            type="text"
            placeholder="Title"
            required
            onChange={(e) => settitle(e.target.value)}
          />
          <p>{error2}</p>

          <Editor
            init={editorConfig}
            theme="snow"
            value={description}
            onEditorChange={(content) => setdescrirption(content)}
          />
          <p>{error3}</p>
        </Col>
        <Button onClick={handlesubmit}> ADD</Button>
      </Row>
    </BasicLayout>
  );
}

export default addblog;
