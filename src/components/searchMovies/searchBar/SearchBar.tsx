import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
`;

const Input = styled.input`
  padding: 15px 0;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #575756;
  border-radius: 0;
  background-position: 100% center;
  width: 100%;
  padding: 10px 14px;
  background-color: transparent;
`;

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <Form onSubmit={onFormSubmit}>
      <Input onChange={changeInput} value={searchQuery} placeholder="Search for movies" />
    </Form>
  );

  function changeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function onFormSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (searchQuery.length === 0) {
      return;
    } else {
      navigate(`/search/${searchQuery}`);
    }
  }
};
