import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({
  listItems,
  handleEditClick,
  handleDeleteClick,
  handleClearItems,
}) => {
  return (
    <section>
      <ul>
        {listItems.length > 0 &&
          listItems.map((item) => (
            <li className="grocery-item" key={item.id}>
              <span>{item.item}</span>{" "}
              <div>
                <FaEdit
                  className="edit-icon"
                  onClick={() => handleEditClick(item.id)}
                />
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDeleteClick(item.id)}
                />
              </div>
            </li>
          ))}
      </ul>

      {listItems.length > 0 && (
        <div className="clear-items" onClick={handleClearItems}>
          Clear Items
        </div>
      )}
    </section>
  );
};

export default List;
