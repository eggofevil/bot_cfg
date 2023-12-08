import React from "react";
import { useState } from "react";

import { JSONTree } from "react-json-tree";

export default function Result({ data, checkedItems }) {
  const [newJSON, setNewJSON] = useState(null);

  function handleClick() {
    function changeChecked(array) {
      return array.map((item) => {
        if (item.childs) item.childs = changeChecked(item.childs);
        if (checkedItems.indexOf(item.id) > -1) item.checked = true;
        return item;
      });
    }
    setNewJSON(changeChecked(data));
  }

  return (
    <>
      <button title="submit" type="button" onClick={handleClick}>
        Отправить
      </button>
      <JSONTree hideRoot={true} data={newJSON} />;
    </>
  );
}
