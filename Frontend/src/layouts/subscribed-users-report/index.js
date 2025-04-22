/* eslint-disable react/jsx-no-duplicate-props */
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
import SubscribedUsersTable from "layouts/subscribed-users-report/data/table";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
function Tables() {
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const handlePageChange = (selectedPage) => {
    setpage(selectedPage.selected + 1);
  };
  const [status, setstatus] = useState("");
  const { columns, rows, totalPages } = SubscribedUsersTable({ status, page, limit });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">{"Author's table"}</SoftTypography>
              <select onChange={(e) => setstatus(e.target.value)}>
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
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
              <Table columns={columns} rows={rows} status={status} totalPages={totalPages}></Table>
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
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
          pageClassName={"page-item"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          disableInitialCallback={totalPages <= 1}
          onPageActive={(e) => e.selected < totalPages - 1 && totalPages > 1}
        />
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Tables;
