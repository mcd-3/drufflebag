import { useState } from "react";
import styles from '../styles/components/swfTable.module.css';
import { formatBytes } from './../utils/bytes.js';
import { getDateFromTimestamp } from './../utils/date.js';
import { getAsset } from './../utils/assets.js';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const SwfTable = ({ swfFiles, setSelectedSwfPath }) => {
  const [activeIndex, setActiveIndex] = useState();

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('avm', {
      cell: info => {
        let avmVersion = getAsset('AVM_UNKOWN');

        if (info && info.getValue()) {
          switch (info.getValue()) {
            case 1:
              avmVersion = getAsset('AVM_1');
              break;
            case 2:
              avmVersion = getAsset('AVM_2');
              break;
            case 0:
            default:
              break;
          }
        }

        return <img src={avmVersion} width={32} height={32} />
      },
      header: 'AVM',
    }),
    columnHelper.accessor('path', {
      cell: info => info.getValue().split('/').pop(),
      header: 'Name',
    }),
    columnHelper.accessor('type', {
      cell: info => '---',
      header: 'Type',
    }),
    columnHelper.accessor('size', {
      cell: info => formatBytes(info.getValue()),
      header: 'Size',
    }),
    columnHelper.accessor('lp', {
      cell: info => info.getValue() ? getDateFromTimestamp(info.getValue()) : "---",
      header: 'Last Played',
    }),
    columnHelper.accessor('status', {
      cell: info => "---",
      header: 'Status',
    }),
    // columnHelper.accessor('url', {
    //   cell: info => "",
    //   header: 'URL Spoof',
    // }),
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
