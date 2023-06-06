import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const DynamicTable = ({ schema, data }) => {
  const headers = Object.entries(schema.properties).map(([key, value]) => ({
    key,
    title: value.title || key,
  }));

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            {headers?.map((header) => (
              <Th key={header.key}>{header.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((rowData, rowIndex) => (
            <Tr key={rowIndex}>
              {headers?.map((header) => (
                <Td key={`${rowIndex}-${header.key}`}>{rowData[header.key]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            {headers?.map((header) => (
              <Th key={header.key}>{header.title}</Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
