import { useState } from "react";

const InvoiceForm = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 0, price: 0 }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ customerName, items });
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Customer Name:
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </label>
      <h3>Items</h3>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].name = e.target.value;
              setItems(newItems);
            }}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].quantity = e.target.value;
              setItems(newItems);
            }}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].price = e.target.value;
              setItems(newItems);
            }}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addItem}>
        Add Item
      </button>
      <button type="submit">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
