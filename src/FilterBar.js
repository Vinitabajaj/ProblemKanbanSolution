import React from 'react';

function FilterBar({ groupingOption, setGroupingOption, sortingOption, setSortingOption }) {
  return (
    <div className="filter-bar">
      <select value={groupingOption} onChange={e => setGroupingOption(e.target.value)}>
        <option value="status">Group by Status</option>
        <option value="user">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>

      <select value={sortingOption} onChange={e => setSortingOption(e.target.value)}>
        <option value="priority">Sort by Priority</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  );
}

export default FilterBar;
