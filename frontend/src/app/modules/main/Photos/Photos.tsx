"use client";
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { usePhotos } from "../hooks";
import Spinner from "../../common/components/Spinner";
import { NextButton, PaginationContent, PrevButton } from "../../common/components/Pagination";
import PhotosPreview from "./components/PhotosPreview";
import LoadingOverlay from "../../common/components/LoadingOverlay";
import { debounce } from "../utils";
import FiltersForm from "./components/FiltersForm";

const initialFormState = {
  title: "",
  albumTitle: "",
  userEmail: "",
};
const minOffset = 1;

interface Props {}

const Photos: React.FC<Props> = ({}) => {
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(minOffset);
  const [formState, setFormState] = useState(initialFormState);
  const [query, setQuery] = useState({});

  const { data, isFetching, status, error } = usePhotos(query);

  const onPrevClick = () => {
    setOffset((prevOffset) => Math.max(prevOffset - 1, minOffset));
  };
  const onNextClick = () => {
    setOffset((prevOffset) => Math.min(prevOffset + 1, data!.pageCount - 1));
  };

  const debouncedSetQuery = useCallback(
    debounce((newQuery) => setQuery(newQuery), 700),
    [],
  );

  useEffect(() => {
    debouncedSetQuery({ ...formState, limit, offset: offset - 1 });
  }, [limit, offset]);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setQuery({ ...formState, limit, offset });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <div>
      <FiltersForm
        onSubmit={onFormSubmit}
        onInputChange={handleChange}
        formState={formState}
        isFetching={isFetching}
      />
      {status === "error" ? <div>Error: {error.message}</div> : null}
      <div className="flex flex-wrap max-h-[75vh] overflow-y-auto relative justify-center">
        <PhotosPreview photos={data.photos} />
        {isFetching ? <LoadingOverlay /> : null}
      </div>
      <div className="flex justify-center mt-4">
        <div className="mr-4">
          <label htmlFor="pageNumber">Page</label>
          <input
            type="number"
            id="pageNumber"
            name="pageNumber"
            value={offset}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setOffset(Math.max(Number(e.target.value), minOffset));
            }}
            disabled={isFetching}
            min={minOffset}
            max={data.pageCount}
          />
        </div>
        <div className="mr-4">
          <label htmlFor="pageSize">Page Size</label>
          <input
            type="number"
            id="pageSize"
            name="pageSize"
            value={limit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setLimit(Number(e.target.value));
            }}
            disabled={isFetching}
          />
        </div>
        <PaginationContent page={data.page} pageCount={data.pageCount}>
          <PrevButton onClick={onPrevClick} disabled={isFetching || data.page === 1}>
            Prev
          </PrevButton>
          <NextButton onClick={onNextClick} disabled={isFetching || data.page === data.pageCount}>
            Next
          </NextButton>
        </PaginationContent>
      </div>
    </div>
  );
};

export default Photos;
