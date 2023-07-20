import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";

const UserListContainer = styled.div`
  margin: 2rem auto;
  max-width: 600px;
`;

const UserItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const UserList = () => {
  const { users, loading, error } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const usersPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage("Error fetching users. Please try again later."); // Set the error message if an API error occurs
    } else {
      setErrorMessage("");
    }
  }, [error]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <UserListContainer>
      <h1>Users</h1>
      <SearchInput
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {errorMessage && <p>{errorMessage}</p>} {/* Display the error message */}
      {currentUsers.map((user) => (
        <Link key={user.id} to={`/user/${user.id}`}>
          <UserItem>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Company: {user.company.name}</p>
          </UserItem>
        </Link>
      ))}
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
      </Pagination>
    </UserListContainer>
  );
};

export default UserList;
