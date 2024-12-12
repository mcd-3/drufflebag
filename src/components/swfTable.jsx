import { useState } from "react";
import styles from '../styles/components/swfTable.module.css';
import { formatBytes } from './../utils/bytes.js';
import { getDateFromTimestamp } from './../utils/date.js';
import { getAsset } from './../utils/assets.js';
import { useContextMenu } from './../hooks/useContextMenu';
import { getStatuses, getTypes, updateSWF } from './../utils/database.js';
import Swf from "../models/swf.js";
import ContextMenu from './contextMenu.jsx';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const SwfTable = ({
  swfFiles,
  setSelectedSwfPath,
  playSwfEvt,
}) => {
  const [activeIndex, setActiveIndex] = useState();
  const [editIndex, setEditIndex] = useState();
  const [editedSwf, setEditedSwf]  = useState(null);
  const { menuVisible, menuItems, menuPosition, showMenu, hideMenu } = useContextMenu();
  const columnHelper = createColumnHelper();

  const handleContextMenu = (event, rowData) => {
    event.preventDefault();
    setActiveIndex(rowData.index);
    showMenu(event, [
      {
        label: 'Edit',
        action: () => {
          setEditedSwf(new Swf(rowData.original));
          setEditIndex(rowData.index);
        }
      },
      { label: 'Play SWF', action: () => playSwfEvt(rowData.original.path, rowData.original.name) }, 
    ]);
  };

  const displayFallback = ({ condition, original }) => {
    return condition ? original : '---';
  };

  const columns = [
    columnHelper.accessor('avm', {
      cell: info => {
        let avmVersion = getAsset('AVM_UNKNOWN');

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
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
      header: 'Name',
    }),
    columnHelper.accessor('type', {
      cell: info => displayFallback({
        condition: info.getValue() !== null,
        original: info.getValue()
      }),
      header: 'Type',
    }),
    columnHelper.accessor('size', {
      cell: info => formatBytes(info.getValue()),
      header: 'Size',
    }),
    columnHelper.accessor('lp', {
      cell: info => displayFallback({
        condition: info.getValue() !== null,
        original: getDateFromTimestamp(info.getValue())
      }),
      header: 'Last Played',
    }),
    columnHelper.accessor('status', {
      cell: info => displayFallback({
        condition: info.getValue() !== null,
        original: info.getValue()
      }),
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
    <div>
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
          {table.getRowModel().rows.map(row => {
            return editIndex == row.id
            ?
              <tr
                key={row.id}
                className={styles['active']}
              >
                <td key={row.getVisibleCells()[0].id}>
                  {flexRender(
                    row.getVisibleCells()[0].column.columnDef.cell,
                    row.getVisibleCells()[0].getContext()
                  )}
                </td>
                <td key={row.getVisibleCells()[1].id}>
                  <input
                    type="text"
                    value={editedSwf.name}
                    onChange={(evt) => {
                      setEditedSwf(
                        new Swf(
                          {...editedSwf, name: evt.target.value}
                        )
                      )
                    }}
                  />
                </td>
                <td key={row.getVisibleCells()[2].id}>
                  <select
                    onChange={(evt) => {
                      setEditedSwf(
                        new Swf(
                          {...editedSwf, type: parseInt(evt.target.value)}
                        )
                      )
                    }}
                  >
                    <option value={0}>---</option>
                    {getTypes().map(typeRes => (
                      <option value={typeRes.id}>{typeRes.type}</option>
                    ))}
                  </select>
                </td>
                <td key={row.getVisibleCells()[3].id}>
                  {flexRender(
                    row.getVisibleCells()[3].column.columnDef.cell,
                    row.getVisibleCells()[3].getContext()
                  )}
                </td>
                <td key={row.getVisibleCells()[4].id}>
                  {flexRender(
                    row.getVisibleCells()[4].column.columnDef.cell,
                    row.getVisibleCells()[4].getContext()
                  )}
                </td>
                <td key={row.getVisibleCells()[5].id}>
                  <select
                    onChange={(evt) => {
                      setEditedSwf(
                        new Swf(
                          {...editedSwf, status: parseInt(evt.target.value)}
                        )
                      )
                    }}
                  >
                    <option value={0}>---</option>
                    {getStatuses().map(statusRes => (
                      <option value={statusRes.id}>{statusRes.status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            :
              <tr
                key={row.id}
                className={styles[`${row.id == activeIndex ? "active" : "inactive"}`]}
                onClick={
                  async () => {
                    if (editedSwf !== null) {
                      updateSWF(editedSwf);
                      setEditedSwf(null);
                    }

                    setEditIndex();
                    setSelectedSwfPath(row.original.path);
                    setActiveIndex(row.id);
                  }
                }
                onContextMenu={(event) => handleContextMenu(event, row)}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
          })}
        </tbody>
      </table>
      {menuVisible && <ContextMenu items={menuItems} position={menuPosition} />}
    </div>
  );
};

export default SwfTable;
