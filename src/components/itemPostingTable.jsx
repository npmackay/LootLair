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
    <Table sx={{ backgroundColor: "white" }}>
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#0e0e0f",
              color: "white",
            }}
          >
            Title
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#0e0e0f",
              color: "white",
            }}
          >
            Description
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#0e0e0f",
              color: "white",
            }}
          >
            Price
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#0e0e0f",
              color: "white",
            }}
          >
            Status
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              backgroundColor: "#0e0e0f",
              color: "white",
            }}
          >
            Seller
          </TableCell>
          <TableCell sx={{ backgroundColor: "#0e0e0f" }} />
        </TableRow>
      </TableHead>

      <TableBody sx={{ textAlign: "center", color: "white" }} items={items}>
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
                      color: "#0e0e0f",
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
