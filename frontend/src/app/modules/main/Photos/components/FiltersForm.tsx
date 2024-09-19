import React, { ChangeEvent, FormEvent } from "react";

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formState: {
    title: string;
    albumTitle: string;
    userEmail: string;
  };
  isFetching: boolean;
}

const FiltersForm: React.FC<Props> = ({ onSubmit, onInputChange, formState, isFetching }) => {
  return (
    <form className="flex justify-center mb-5" onSubmit={onSubmit}>
      <div className="mx-1">
        <label htmlFor="title">Photo Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={onInputChange}
          value={formState.title}
        />
      </div>
      <div className="mx-1">
        <label htmlFor="albumTitle">Album Title</label>
        <input
          type="text"
          id="albumTitle"
          name="albumTitle"
          onChange={onInputChange}
          value={formState.albumTitle}
        />
      </div>
      <div className="mx-1">
        <label htmlFor="userEmail">User Email</label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          onChange={onInputChange}
          value={formState.userEmail}
        />
      </div>
      <div className="self-end ml-5">
        <button className="primary" type="submit" disabled={isFetching}>
          Search
        </button>
      </div>
    </form>
  );
};

export default FiltersForm;
