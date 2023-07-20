import React, { useContext, useState, useEffect, useRef } from "react";
import { AddPostContext } from "../contexts/AddPostContext";
import styled from "styled-components";
import { motion } from "framer-motion";

const AddPostContainer = styled.div`
  margin: 2rem auto;
  max-width: 600px;
`;

const AddPostButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const SlideInForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
`;

const SubmitButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddPost = () => {
  const { isAdding, setIsAdding } = useContext(AddPostContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const formRef = useRef(null); // Create a reference to the form element

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement POST request here
    // Reset form values and close the form
    setTitle("");
    setBody("");
    setIsAdding(false);
  };

  useEffect(() => {
    if (isAdding && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isAdding]);

  return (
    <AddPostContainer>
      {isAdding ? (
        <SlideInForm
          ref={formRef} // Add the ref to the form
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          onSubmit={handleSubmit}
        >
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
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
          >
            Submit
          </SubmitButton>
          <SubmitButton
            type="button"
            onClick={() => setIsAdding(false)}
            whileHover={{ scale: 1.05 }}
          >
            Cancel
          </SubmitButton>
        </SlideInForm>
      ) : (
        <AddPostButton onClick={() => setIsAdding(true)}>Add Post</AddPostButton>
      )}
    </AddPostContainer>
  );
};

export default AddPost;