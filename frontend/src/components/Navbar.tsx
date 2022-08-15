
import React, { useState } from "react";
import Filter from "./Filter"
import { CompletionFilter } from "../types";

type Props = {
  onSubmit: (value: string) => () => void;
  setFilter: (value: string) => void;
  setCompletedFilter: (value: CompletionFilter) => void;
  filterForCompleted: CompletionFilter;
  filterValue: string;
}

export default function Navbar({onSubmit, filterValue, setFilter, filterForCompleted, setCompletedFilter}: Props) {
  const [inputValue, setInputValue] = useState("");
  
  return <form onSubmit={onSubmit(inputValue)}>
    <input
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
      
    />
    <button type="submit">Criar Todo</button>
    <Filter
      filterForCompleted={filterForCompleted}
      setCompletedFilter={setCompletedFilter}
      filterValue={filterValue}
      setFilter={setFilter}
    />
  </form>;
}