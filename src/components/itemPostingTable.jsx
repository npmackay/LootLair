import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";

import { FaGavel } from "react-icons/fa";

export default function ItemPostingTable({ items }) {
  console.log(items);
  return (
    <Table>
      <TableHead />
      <TableBody items={items} />
      <TableRow>
        <TableCell>Item Name</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Seller Name</TableCell>
      </TableRow>

      {items.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>{item.itemStatus}</TableCell>
          <TableCell>{item.sellerName}</TableCell>
          <IconButton>
            <FaGavel style={{ transform: "rotate(270deg)" }}  />
          </IconButton>
        </TableRow>
      ))}
    </Table>
  );
}
