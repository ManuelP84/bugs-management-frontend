import { useState } from "react";


export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = async(value) =>{
    setGlobalFilter(value)
  }

 return (
    <div >
      <h2 className="text-center">Buscar:</h2>
      <input type="text" className="form-control"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} entradas...`}
      />
    </div>
  );
}