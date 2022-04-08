import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyUploadAdapter from "utils/MyUploadAdapter";
// import JoditEditor from "./TextEditor";
import api from "../../api";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";
// core components

const AddVideo = ({ openModal, handleModal, getVideos }) => {
  let [video, setVideo] = useState({ is_featured: false });
  let [content, setContent] = useState("");

  const handleInput = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const property in video) {
      formData.append(property, video[property]);
    }
    console.log("formData is for video", formData, video);
    api("post", "/videos", video)
      .then((res) => {
        toast.success("Article added successfully");
        getVideos();
        handleModal();
      })
      .catch(() => {
        toast.error("An error occurred");
      });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="Y" toggle={handleModal}>
          Add Video
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-fname"
                        >
                          Title
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter tile here"
                          type="text"
                          value={video.video_title}
                          name="video_title"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-fname"
                        >
                          YouTube Embed Link
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter YouTube Embed Link here"
                          type="text"
                          value={video.yt_link}
                          name="yt_link"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddVideo;
