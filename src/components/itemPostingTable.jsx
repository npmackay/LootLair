import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TablePagination,
} from "@mui/material";
import PurchaseItemModal from "./purchaseItemModal";
import { FaGavel } from "react-icons/fa";
import { useState } from "react";
function createTableCell(item, key) {
  return (
    <TableCell
      key={key}
      sx={{
        textAlign: "center",
      }}
    >
      {item[key]}
    </TableCell>
  );
}
export default function ItemPostingTable({ items }) {
  const [openPurchaseItemModal, setOpenPurchaseItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Table
      sx={{
        backgroundColor: "#F3F4F6",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#1E0342",
              color: "white",
              fontWeight: "bold",
              fontSize: "26px",
              borderRight: "1px solid #D1D5DB",
            }}
          >
            Title
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#1E0342",
              color: "white",
              fontWeight: "bold",
              fontSize: "26px",
              borderRight: "1px solid #D1D5DB",
            }}
          >
            Description
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#1E0342",
              color: "white",
              fontWeight: "bold",
              fontSize: "26px",
              borderRight: "1px solid #D1D5DB",
            }}
          >
            Price
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#1E0342",
              color: "white",
              fontWeight: "bold",
              fontSize: "26px",
              borderRight: "1px solid #D1D5DB",
            }}
          >
            Status
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#1E0342",
              color: "white",
              fontWeight: "bold",
              fontSize: "26px",
            }}
          >
            Seller
          </TableCell>
          <TableCell sx={{ backgroundColor: "#1E0342" }} />
        </TableRow>
      </TableHead>

      <TableBody sx={{ textAlign: "center", color: "#111827" }} items={items}>
        {items
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <TableRow key={item.id}>
              {[
                "title",
                "description",
                "price",
                "itemStatus",
                "sellerName",
              ].map((key) => createTableCell(item, key))}

              <TableCell>
                <IconButton
                  onClick={() => {
                    console.log("clicked");
                    setOpenPurchaseItemModal(true);
                    setSelectedItem(item);
                  }}
                >
                  <FaGavel
                    style={{
                      color: "#111827",
                      transform: "rotate(270deg)",
                    }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "#F3F4F6",
          borderTop: "1px solid #D1D5DB",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      />

      {openPurchaseItemModal && (
        <PurchaseItemModal
          purchaseData={selectedItem}
          open={openPurchaseItemModal}
          handleClose={() => setOpenPurchaseItemModal(false)}
        />
      )}
    </Table>
  );
}
