import React from "react";
import { CompletionFilter } from "../types";

type Props = {
    filterValue: string;
    filterForCompleted: CompletionFilter;
    setFilter: (value: string) => void;
    setCompletedFilter: (value: CompletionFilter) => void;
}

export default function Filter({filterValue, filterForCompleted, setFilter, setCompletedFilter}: Props) {
  return <>
      <div>
        <input
          onChange={(e) => setFilter(e.target.value)}
          value={filterValue}
          type="text"
          placeholder="Filtrar tarefas"
        />
      </div>
      <div>
        <label htmlFor="is-completed">
          <select 
            id="is-completed"
            onChange={(e) => setCompletedFilter(e.target.value as CompletionFilter)}
            value={filterForCompleted.toString()}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not-completed">Not Completed</option>
          </select>
        </label>
      </div>
    </>;
}