/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from "react";
import api from "api";
import { Store, UpdateStore } from "StoreContext";
import {
  Badge,
  Card,
  CardHeader,
  Button,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import AddVideo from "./AddVideo";
// import EditArticle from "./EditArticle";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Channel = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [blog, setBlog] = useState({});
  const { videos } = Store();
  const updateStore = UpdateStore();
  console.log("videos are", videos);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await api("get", "/videos");

    if (data) {
      updateStore({ videos: data });
    }
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (article) => {
    setBlog(article || blog);
    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api("delete", `/videos/${id}`)
      .then(() => {
        toast.success("Article deleted successfully");
        getVideos();
      })
      .catch(() => {
        toast.error("An error occurred while deleting");
      });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">Channel</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Video
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Video</th>
                    <th scope="col">createdAt</th>
                    <th scope="col">updatedAt</th>
                  </tr>
                </thead>
                <tbody>
                  {videos?.map((video) => {
                    return (
                      <tr>
                        <td>{video.video_title}</td>
                        <td>
                          <iframe
                            src={video.yt_link.replace("/watch?v=", "/embed/")}
                            title="video"
                            width="40%"
                            height="20%"
                          />
                        </td>

                        <td>{new Date(video.createdAt).toDateString()}</td>
                        <td>{new Date(video.updatedAt).toDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddVideo
            openModal={openModal}
            handleModal={handleModal}
            getVideos={getVideos}
          />
        )}
        {/* {editModal && (
          <EditArticle
            openModal={editModal}
            handleModal={handleEditModal}
            blog={blog}
            setBlog={setBlog}
            getArticles={getArticles}
          />
        )} */}
      </Container>
    </>
  );
};

export default Channel;
