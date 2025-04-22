/* eslint-disable react/jsx-no-duplicate-props */
/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================
* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// @mui material components
import Card from "@mui/material/Card";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
// Data
import SubscribedUsers from "layouts/sales-report/data/table";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
function Tables() {
  const [selectstartDate, setSelectstartDate] = useState("");
  const [selectendDate, setSelectendDate] = useState("");
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const handlePageChange = (selectedPage) => {
    setpage(selectedPage.selected + 1);
  };
  const { columns, rows, totalPages } = SubscribedUsers({ selectstartDate,selectendDate, page, limit });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}  >
        <SoftBox mb={3}>
        <SoftBox
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2rem",
                  position:"relative",
                  top:"3rem",
                  zIndex:"1"
                }}
              >
                <DatePicker
                  placeholderText="From "
                  selected={selectstartDate}
                  onChange={(date) => setSelectstartDate(date)}
                  dateFormat="dd - MM - yyyy"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  value={selectstartDate}
                ></DatePicker>
                <DatePicker
                  placeholderText="To"
                  selected={selectendDate}
                  onChange={(date) => setSelectendDate(date)}
                  dateFormat="dd - MM - yyyy"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  value={selectendDate}
                ></DatePicker>
              </SoftBox>
          <Card>
            <SoftBox display="flex" justifyContent="space-evenly" alignItems="center" p={3}>                
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
              <Table columns={columns} rows={rows} totalPages={totalPages} />
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
