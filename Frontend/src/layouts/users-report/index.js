/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import UserData from "layouts/users-report/data/table";
import ReactPaginate  from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
function Tables() {
  const [subscribed, setsubscribed] = useState("");
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const handlePageChange = (selectedPage) => {
    setpage(selectedPage.selected + 1);
  };
  const { columns, rows, totalPages } = UserData({ subscribed, page, limit });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Users</SoftTypography>
              <select onChange={(e) => setsubscribed(e.target.value)}>
                <option value="">All</option>
                <option value="subscribe">subscribed</option>
                <option value="Not Subscribed">Not subscribed</option>
              </select>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} subscribed={subscribed} totalPages={totalPages}  />
            </SoftBox>
          </Card>
        </SoftBox>
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
          nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active-page"}
          pageRangeDisplayed={10} 
          marginPagesDisplayed={1}
          breakLabel={"..."}
          breakClassName={"break-me"}
          forcePage={page - 1} 
          disableInitialCallback={true}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
          pageClassName={"page-item"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
       
        />
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Tables;
