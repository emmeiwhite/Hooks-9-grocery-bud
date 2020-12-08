import React, { useState, useEffect } from "react";
import List from "./components/list/List";
import Alert from "./components/alert/Alert";
import "./App.css";

function App() {
  const [listItems, setListItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchItem) {
      const item = { item: searchItem, id: new Date().getTime().toString() };

      console.log(item);
      setListItems([...listItems, item]);
      setIsError(false);
      setSearchItem("");
    } else {
      setIsError(true);
      return;
    }
  };
  return (
    <main className="main-wrapper">
      <section className="main-grocery">
        <h3>Grocery List</h3>
        <form className="main-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="grocery-name"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
          />
          <button type="submit">Add Item</button>
        </form>
        {isError ? (
          <span className="error-message">No Grocery Name Provided</span>
        ) : (
          ""
        )}
        <ul>
          {listItems.length > 0 &&
            listItems.map((item) => (
              <li className="grocery-item" key={item.id}>
                <span>{item.item}</span> <div>icons</div>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
