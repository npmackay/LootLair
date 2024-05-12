import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";

import { FaGavel } from "react-icons/fa";

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

      <TableBody
        sx={{ textAlign: "center", backgroundColor: "#0e0e0f", color: "white" }}
        items={items}
      />

      {items.map((item) => (
        <TableRow key={item.id}>
          {["title", "description", "price", "itemStatus", "sellerName"].map(
            (key) => createTableCell(item, key)
          )}

          <IconButton>
            <FaGavel
              style={{
                color: "#0e0e0f",

                transform: "rotate(270deg)",
              }}
            />
          </IconButton>
        </TableRow>
      ))}
    </Table>
  );
}
