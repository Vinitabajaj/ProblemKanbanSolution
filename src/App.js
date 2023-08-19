import React, { useState, useEffect } from 'react';
import './App.css';
import FilterBar from './FilterBar';
import Card from './Card';

function App() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Apply grouping and sorting based on options
    const groupedAndSortedTickets = groupAndSortTickets(
      groupingOption,
      sortingOption,
      tickets
    );
    setFilteredTickets(groupedAndSortedTickets);
  }, [groupingOption, sortingOption, tickets]);

  return (
    <div className="App">
      <h1>Kanban Board App</h1>
      <FilterBar
        groupingOption={groupingOption}
        setGroupingOption={setGroupingOption}
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
      />
      <div className="board">
        {filteredTickets.map(group => (
          <div key={group.groupName} className="group">
            <h2>{group.groupName}</h2>
            <div className="horizontal-tickets">
              {group.items.map(ticket => (
                <Card className="maincard" key={ticket.id} ticket={ticket} users={users} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function getPriorityLabel(priority) {
  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };
  return priorityLabels[priority] || 'Unknown';
}

function groupAndSortTickets(groupingOption, sortingOption, tickets) {
  if (groupingOption === 'status') {
    // Group by status and sort
    const groupedTickets = tickets.reduce((groups, ticket) => {
      const groupName = ticket.status;
      if (!groups[groupName]) {
        groups[groupName] = { groupName, items: [] };
      }
      groups[groupName].items.push(ticket);
      return groups;
    }, {});

    // Sort the groups and items based on sortingOption
    for (const group in groupedTickets) {
      groupedTickets[group].items.sort((a, b) => a[sortingOption] - b[sortingOption]);
    }

    return Object.values(groupedTickets);
  } else if (groupingOption === 'user') {
    // Group by user and sort
    const groupedTickets = tickets.reduce((groups, ticket) => {
      const groupName = ticket.user ? ticket.user.name : '';
      if (!groups[groupName]) {
        groups[groupName] = { groupName, items: [] };
      }
      groups[groupName].items.push(ticket);
      return groups;
    }, {});

    // Sort the groups and items based on sortingOption
    for (const group in groupedTickets) {
      groupedTickets[group].items.sort((a, b) => a[sortingOption] - b[sortingOption]);
    }

    return Object.values(groupedTickets);
  } else if (groupingOption === 'priority') {
    // Group by priority and sort
    const groupedTickets = tickets.reduce((groups, ticket) => {
      const groupName = getPriorityLabel(ticket.priority);
      if (!groups[groupName]) {
        groups[groupName] = { groupName, items: [] };
      }
      groups[groupName].items.push(ticket);
      return groups;
    }, {});

    // Sort the groups and items based on sortingOption
    for (const group in groupedTickets) {
      groupedTickets[group].items.sort((a, b) => a[sortingOption] - b[sortingOption]);
    }

    return Object.values(groupedTickets);
  } else if (groupingOption === 'title') {
    // Group by title and sort
    const groupedTickets = tickets.reduce((groups, ticket) => {
      const groupName = ticket.title; // Grouping by title
      if (!groups[groupName]) {
        groups[groupName] = { groupName, items: [] };
      }
      groups[groupName].items.push(ticket);
      return groups;
    }, {});

    // Sort the groups and items based on sortingOption
    for (const group in groupedTickets) {
      groupedTickets[group].items.sort((a, b) => a[sortingOption].localeCompare(b[sortingOption]));
    }

    return Object.values(groupedTickets);
  }

  // Placeholder sorting logic
  return tickets.sort((a, b) => a[sortingOption] - b[sortingOption]);
}


export default App;