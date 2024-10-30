import React, { useState } from 'react';
import './SearchOrder.css'

const FilterComponent = ({ onSearch }) => {
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(orderId);
  };

  return (
    <div className="filter-component-searchorder">
      <form onSubmit={handleSubmit}>
        <input
        className='searchinput'
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
        />
        <button className='Searchbtn' type="submit">Search</button>
      </form>
    </div>
  );
};

export default FilterComponent;
