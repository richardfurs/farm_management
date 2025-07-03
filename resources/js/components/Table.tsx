interface TableProps<T extends { id: number | string }> {
  columns: string[];
  records: T[];
  editRecord: (record: T) => void;
  deleteRecord: (record: T) => void;
}

const Table = <T extends { id: number | string },>({ columns, records, editRecord, deleteRecord }: TableProps<T>) => {
  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto mt-6 flex">
        <table className="text-xs bg-white lg:text-sm">
          <thead>
            <tr>
              {columns.map(column => (
                <th className="border border-gray-400 px-4 py-2" key={column}>{column}</th>
              ))}
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                {Object.entries(record).map(([key, value]) => (
                  <td key={key} className="border border-gray-400 px-4 py-2">
                    {typeof value === 'object' && value !== null
                      ? (value as any).name ?? '[object]'
                      : String(value ?? '')}
                  </td>
                ))}
                <td className="border border-gray-400 px-4 py-2">
                  <span onClick={() => editRecord(record)} className="text-blue-400 cursor-pointer">Edit</span> 
                  <br /> 
                  <span onClick={() => deleteRecord(record)} className="text-red-400 cursor-pointer">Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table;
