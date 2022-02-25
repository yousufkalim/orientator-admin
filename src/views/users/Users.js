import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "StoreContext";
import api from "api";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import ExportExecl from "views/exportfiles/ExportExecl.js";
const Users = () => {
  const updateStore = UpdateStore();
  const history = useHistory();
  const { Users } = Store();
  const [page, setPage] = React.useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  // Get dashboard data from API
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  let getAllUsers = async () => {
    setLoading(true);
    let res = await api(
      "get",
      `/admin/users/all-users?pageNumber=${page}&pageSize=${10}`
    );
    if (res) {
      updateStore({ Users: res?.users });
      setCount(res?.totalUsers);
      setLoading(false);
    }
  };
  console.log("users are", Users);

  // Exporting
  const myHeader = [
    "Prénom",
    "Nom",
    "Date de naissance",
    "addresse",
    "email",
    "phone",
    "Classe",
    "Établissement actuel",
  ];

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <ExportExecl Users={Users} myHeader={myHeader} />
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Phone </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {Users?.map((user) => {
                    return (
                      <tr>
                        <td title={user.email}>{user.email}</td>
                        <td title={user.first_name}>{user.first_name}</td>
                        <td title={user.last_name}>{user.last_name}</td>
                        <td title={user.phoe}>{user.phone}</td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={() =>
                                  history.push(`/admin/users/${user._id}`)
                                }
                              >
                                Afficher l'utilisateur
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination     ///////////// */}
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${page == 0 && "active"}`}>
                      <PaginationLink onClick={(e) => setPage(0)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${page == 1 && "active"}`}>
                      <PaginationLink onClick={(e) => setPage(1)}>
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${page == 2 && "active"}`}>
                      <PaginationLink onClick={(e) => setPage(2)}>
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${page > 2 && "active"}`}>
                      <PaginationLink
                        onClick={(e) => setPage((prev) => prev + 1)}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Users;
