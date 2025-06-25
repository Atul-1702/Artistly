"use client";

import { useDispatch, useSelector } from "react-redux";
import "./SearchComponent.scss";
import Image from "next/image";
import { toggleFilterWindow, toggleGridListView } from "@/redux/filterSlice";
import { useRef, useState } from "react";
import ArtistModel from "@/models/artist-model";
import { useRouter } from "next/navigation";
function SearchComponent({ setSearchedValue, modifiedArtist }) {
  const dispatch = useDispatch();
  const { isGridView } = useSelector((reducer) => reducer?.filterSlice);
  const inputRef = useRef(null);
  const [suggestionList, setSuggestionList] = useState<ArtistModel[]>([]);
  const router = useRouter();
  function onFilterButtonClicked() {
    dispatch(toggleFilterWindow());
  }
  function onToggleGridListView(state: boolean) {
    dispatch(toggleGridListView(state));
  }
  function getSearchedValue() {
    setSearchedValue((inputRef?.current?.value as string).trim().toLowerCase());
  }
  function showSuggestion() {
    setTimeout(() => {
      setSuggestionList(
        modifiedArtist.filter((item: ArtistModel) => {
          if (
            item.Name.toLowerCase().startsWith(
              inputRef?.current?.value.toLowerCase()
            )
          ) {
            return true;
          }
          return false;
        })
      );
    }, 700);
  }
  function handleNaviagtion(name) {
    router.push(`/artist-book?name=${name}`);
  }
  return (
    <section className="search-component-section-wrapper">
      <div id="search-container">
        <input
          id="input-box"
          type="text"
          role="search"
          aria-label="search-input"
          placeholder="search artist..."
          ref={inputRef}
          onChange={showSuggestion}
          autoComplete="off"
        />
        <Image
          id="search-icon"
          alt="search-icon"
          src="/images/search-icon.svg"
          width={24}
          height={24}
          onClick={getSearchedValue}
        />
        {suggestionList.length !== 0 ? (
          <ul className="suggestion-list">
            {suggestionList.map((suggestion: ArtistModel, index: number) => (
              <li onClick={() => handleNaviagtion(suggestion.Name)} key={index}>
                {suggestion.Name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div id="button-container">
        <button
          className="toggle-filter-window"
          onClick={onFilterButtonClicked}
          aria-label="filter-by"
        >
          <span>Filter</span>
          <Image
            alt="filter-icon"
            src="/images/filter-icon.svg"
            width={24}
            height={24}
          />
        </button>
        <button aria-label="list-view-grid-view">
          <Image
            className="grid-list-image"
            alt="grid-view-icon"
            src={
              isGridView === true
                ? "/images/grid-view-selected-icon.svg"
                : "/images/grid-view-icon.svg"
            }
            width={52}
            height={52}
            onClick={() => onToggleGridListView(true)}
          />
          <Image
            className="grid-list-image"
            alt="list-view-icon"
            src={
              isGridView === false
                ? "/images/list-view-selected-icon.svg"
                : "/images/list-view-icon.svg"
            }
            width={52}
            height={52}
            onClick={() => onToggleGridListView(false)}
          />
        </button>
      </div>
    </section>
  );
}

export default SearchComponent;
