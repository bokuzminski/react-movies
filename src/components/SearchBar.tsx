import React, { useEffect, useRef, useState } from "react";
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
const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.state ? "auto" : "none")};
  cursor: ${props => (props.state ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--text-color);
  @media ${props => props.theme.mediaQueries.large} {
    color: var(--text-color);
    font-size: 10px;
  }
  @media ${props => props.theme.mediaQueries.small} {
    color: var(--text-color);
    font-size: 8px;
  }
`;
export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [state, setState] = useState(false);
  const node = useRef();
  const inputFocus = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleclick);
    return () => {
      document.removeEventListener("mousedown", handleclick);
    };
  }, []);

  const handleclick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
  };
  //form submiting and url change
  function onFormSubmit(e) {
    e.preventDefault();
    if (input.length === 0) {
      return;
    } else {
      setInput("");
      setState(false);
      history.push(`/search/${input}`);
    }
  }

  return (
    <Form state={state} onSubmit={onFormSubmit} ref={node}>
      <Button type="submit" state={state}></Button>
      <Input onChange={e => setInput(e.target.value)} value={input} state={state} placeholder="Search for movies" />
    </Form>
  );
};
