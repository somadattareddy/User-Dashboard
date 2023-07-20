import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { motion } from "framer-motion";
import styled from "styled-components";
import AddPost from "./AddPost";

const UserDetailsContainer = styled.div`
  margin: 2rem auto;
  max-width: 600px;
`;

const UserDetailItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const UserPosts = styled.div`
  margin-top: 2rem;
`;

const PostItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const UserDetails = () => {
  const { id } = useParams();
  const { users } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const selectedUser = users.find((user) => user.id === parseInt(id));
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log("Error fetching user details", error);
        });
    }

    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching user posts", error);
      });
  }, [id, users]);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial styles (hidden)
      animate={{ opacity: 1 }} // Animation styles (fade-in)
      exit={{ opacity: 0 }} // Exit styles (fade-out)
    >
    <UserDetailsContainer>
      <UserDetailItem>
        <h2>{user.name}</h2>
        <p>Address: {user.address.city}, {user.address.street}, {user.address.suite}, {user.address.zipcode}</p>
        <p>Website: {user.website}</p>
        <p>Company: {user.company.name}</p>
        <p>Catchphrase: {user.company.catchPhrase}</p>
        <p>BS: {user.company.bs}</p>
      </UserDetailItem>
      <UserPosts>
        <h3>Posts by {user.name}</h3>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body.slice(0, 100)}...</p>
          </PostItem>
        ))}
      </UserPosts>
      <AddPost />
    </UserDetailsContainer>
    </motion.div>
  );
};

export default UserDetails;