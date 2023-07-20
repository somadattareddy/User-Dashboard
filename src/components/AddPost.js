import React, { useContext, useState } from "react";
import { AddPostContext } from "../contexts/AddPostContext";
import styled from "styled-components";

const AddPostContainer = styled.div`
  margin: 2rem auto;
  max-width: 600px;
`;

const AddPostForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
`;

const AddPost = () => {
  const { isAdding, setIsAdding } = useContext(AddPostContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement POST request here
    // Reset form values and close the form
    setTitle("");
    setBody("");
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <AddPostContainer>
        <button onClick={() => setIsAdding(true)}>Add Post</button>
      </AddPostContainer>
    );
  }

  return (
    <AddPostContainer>
      <AddPostForm onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setIsAdding(false)}>
          Cancel
        </button>
      </AddPostForm>
    </AddPostContainer>
  );
};

export default AddPost;