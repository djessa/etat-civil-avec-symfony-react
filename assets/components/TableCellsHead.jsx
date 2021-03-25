import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';

const TableCellsHead = ({ columns, bgClass }) => (
    <TableRow className={bgClass}>
        { columns.map((column, index) => (<TableCell key={index} style={{ fontWeight: 'bold' }}>{column}</TableCell>))}
    </TableRow>
);

export default TableCellsHead;