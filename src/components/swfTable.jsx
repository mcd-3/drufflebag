import { useState } from "react";
import styles from '../styles/components/swfTable.module.css';
import { formatBytes } from './../utils/bytes.js';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const SwfTable = ({ swfFiles, setSelectedSwfPath }) => {
  const [activeIndex, setActiveIndex] = useState();

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('avm', {
      cell: info => <img src="public/avm_unknown.svg" width={32} height={32} />,
      header: 'AVM',
    }),
    columnHelper.accessor('path', {
      cell: info => info.getValue().split('/').pop(),
      header: 'Name',
    }),
    columnHelper.accessor('type', {
      cell: info => 'Game',
      header: 'Type',
    }),
    columnHelper.accessor('size', {
      cell: info => formatBytes(info.getValue()),
      header: 'Size',
    }),
    columnHelper.accessor('lp', {
      cell: info => "June 23, 2024",
      header: 'Last Played',
    }),
    columnHelper.accessor('status', {
      cell: info => "Playable",
      header: 'Status',
    }),
    columnHelper.accessor('url', {
      cell: info => "https://ducklife.com",
      header: 'URL Spoof',
    }),
  ];

  const table = useReactTable({
    data: swfFiles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className={styles['swfTable-root']}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className={styles[`${row.id == activeIndex ? "active" : "inactive"}`]} onClick={
            () => {
              setSelectedSwfPath(row.original.path);
              setActiveIndex(row.id);
              console.log(row)
            }
          }>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SwfTable;
