import { useState } from "react";
import styles from '../styles/components/swfTable.module.css';
import { formatBytes } from './../utils/bytes.js';
import { getDateFromTimestamp } from './../utils/date.js';
import { getAsset } from './../utils/assets.js';
import { useContextMenu } from './../hooks/useContextMenu';
import { getStatuses, getTypes, updateSWF } from './../utils/database.js';
import { writeJsonCache } from './../utils/invoker.js';
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
  setSwfFiles,
  setSelectedSwfPath,
  playSwfEvt,
}) => {
  const [activeIndex, setActiveIndex] = useState();
  const [editIndex, setEditIndex] = useState();
  const [editedSwf, setEditedSwf]  = useState(null);
  const { menuVisible, menuItems, menuPosition, showMenu } = useContextMenu();
  const columnHelper = createColumnHelper();

  const statuses = getStatuses();
  const types = getTypes();

  const handleContextMenu = (event, rowData) => {
    event.preventDefault();
    setActiveIndex(rowData.index);
    setSelectedSwfPath(rowData.original.path);
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

  const unfocusEditableRow = (row) => {
    if (editedSwf !== null) {
      const newArray = [...swfFiles];
      for (let i = 0; i < swfFiles.length; i++) {
        if (swfFiles[i].md5_hash === editedSwf.md5_hash) {
          newArray[i] = editedSwf;
          setSwfFiles([...newArray]);
          break;
        }
      }
      writeJsonCache(newArray);
      updateSWF(editedSwf);
      setEditedSwf(null);
    }

    setEditIndex();
    setSelectedSwfPath(row.original.path);
    setActiveIndex(row.id);
  }

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
      cell: info => info.getValue() !== null
      ? types[(info.getValue() ? info.getValue() - 1 : 0)].type
      : '---',
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
      cell: info => info.getValue() !== null
        ? statuses[(info.getValue() ? info.getValue() - 1 : 0)].status
        : '---',
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
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    unfocusEditableRow(row);
                  }
                }}
              >
                <td key={row.getVisibleCells()[0].id}>
                  {flexRender(
                    row.getVisibleCells()[0].column.columnDef.cell,
                    row.getVisibleCells()[0].getContext()
                  )}
                </td>
                <td key={row.getVisibleCells()[1].id} className={styles["td-row"]}>
                  <input
                    className={styles['swfTable-text-input']}
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
                <td key={row.getVisibleCells()[2].id} className={styles["td-row"]}>
                  <select
                    className={styles['no-margin']}
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
                <td key={row.getVisibleCells()[3].id} className={styles["td-row"]}>
                  {flexRender(
                    row.getVisibleCells()[3].column.columnDef.cell,
                    row.getVisibleCells()[3].getContext()
                  )}
                </td>
                <td key={row.getVisibleCells()[4].id} className={styles["td-row"]}>
                  {flexRender(
                    row.getVisibleCells()[4].column.columnDef.cell,
                    row.getVisibleCells()[4].getContext()
                  )}
                </td>
                <td key={row.getVisibleCells()[5].id} className={styles["td-row"]}>
                  <select
                    className={styles['no-margin']}
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
                    unfocusEditableRow(row);
                  }
                }
                onContextMenu={(event) => handleContextMenu(event, row)}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={`${styles["td-row"]} ${styles["text-overflow-ellipsis"]}`}>
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
