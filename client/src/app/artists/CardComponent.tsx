"use client";
import SearchComponent from "./searchcomponent/SearchComponent";
import style from "./card.module.scss";
import FilterComponent from "./filtercomponent/FilterComponent";
import { useSelector } from "react-redux";
import Image from "next/image";
import ArtistModel from "@/models/artist-model";
import React, { Suspense, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
function CardComponent({ artist }) {
  const { filterToggle, isGridView } = useSelector(
    (reducer) => reducer?.filterSlice
  );
  const [startIndex, setStartIndex] = useState<number>(0);
  const [modifiedArtist, setModifiedArtist] = useState<ArtistModel[]>(artist);
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [filterdData, setFilteredData] = useState<ArtistModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const router = useSearchParams();
  const buttonRouter = useRouter();

  useEffect(() => {
    setSelectedCategory(router.get("category") as string);
  }, [router]);

  function onPageChangeButtonClicked(index: number) {
    setStartIndex(index);
  }
  function onPreviousButtonClicked() {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  }
  function onNextButtonClicked() {
    if (Math.floor(modifiedArtist.length / 12) - 1 > startIndex) {
      setStartIndex(startIndex + 1);
    }
  }
  function applyFilter() {
    if (selectedCategory || selectedLocation || selectedPrice) {
      const filter = artist.filter((item: ArtistModel) => {
        if (
          (selectedCategory === "" || item.Category === selectedCategory) &&
          (selectedLocation == "" || item.Location == selectedLocation) &&
          (selectedPrice === "" || item.Range == selectedPrice)
        ) {
          return true;
        }
        return false;
      });
      setModifiedArtist(filter);
      setFilteredData(filter);
    } else {
      setModifiedArtist(artist);
      setFilteredData([]);
    }
  }

  function removeFilter(val: string) {
    if (val === "category") {
      setSelectedCategory("");
    } else {
      if (val === "location") {
        setSelectedLocation("");
      } else {
        setSelectedPrice("");
      }
    }
  }
  function removeAllFilter() {
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedPrice("");
    setModifiedArtist(artist);
    setFilteredData([]);
  }
  useEffect(() => {
    applyFilter();
  }, [selectedCategory, selectedLocation, selectedPrice]);

  useEffect(() => {
    const baseData = filterdData.length === 0 ? artist : filterdData;
    if (searchedValue !== "") {
      const newData = baseData.filter((artist: ArtistModel) =>
        artist.Name.trim().toLowerCase().includes(searchedValue.toLowerCase())
      );
      setModifiedArtist(newData);
    } else {
      setModifiedArtist(baseData);
    }
  }, [searchedValue]);

  const handleClick = () => {
    buttonRouter.push("/artist-book");
  };
  return (
    <main className={style["page-main-section-wrapper"]}>
      <SearchComponent
        setSearchedValue={setSearchedValue}
        modifiedArtist={modifiedArtist}
      ></SearchComponent>
      {filterToggle === true ? (
        <FilterComponent
          setSelectedCategory={setSelectedCategory}
          setSelectedLocation={setSelectedLocation}
          setSelectedPrice={setSelectedPrice}
          applyFilter={applyFilter}
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
          selectedPrice={selectedPrice}
        ></FilterComponent>
      ) : null}
      <hr />

      <div id={style["all-filter-tags"]}>
        {selectedCategory ? (
          <button>
            <span>{selectedCategory}</span>
            <Image
              src="/images/remove-tag-icon.svg"
              alt="cross-icon"
              height={24}
              width={24}
              onClick={() => removeFilter("category")}
            />
          </button>
        ) : null}

        {selectedLocation ? (
          <button>
            <span>{selectedLocation}</span>
            <Image
              src="/images/remove-tag-icon.svg"
              alt="cross-icon"
              height={24}
              width={24}
              onClick={() => removeFilter("location")}
            />
          </button>
        ) : null}

        {selectedPrice ? (
          <button>
            <span>{selectedPrice}</span>
            <Image
              src="/images/remove-tag-icon.svg"
              alt="cross-icon"
              height={24}
              width={24}
              onClick={() => removeFilter("price")}
            />
          </button>
        ) : null}
        {selectedPrice || selectedCategory || selectedLocation ? (
          <button>
            <span>Reset Filter</span>
            <Image
              src="/images/refresh.svg"
              alt="reset-icon"
              height={24}
              width={24}
              onClick={removeAllFilter}
            />
          </button>
        ) : null}
      </div>
      <div className={style["artist-card-wrapper"]}>
        {modifiedArtist
          .slice(startIndex * 12, startIndex * 12 + 12)
          .map((artistInfo: ArtistModel, index: number) => (
            <React.Fragment key={index}>
              {isGridView === true ? (
                <div className={style["artist-card-grid-view"]}>
                  <div className={style["artist-image"]}>
                    <Image
                      src="/images/Hrithik.webp"
                      alt="Arijit Singh"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className={style["artist-info"]}>
                    <h2 className={style["artist-name"]}>{artistInfo.Name}</h2>
                    <p className={style["category"]}>
                      Category: <span>{artistInfo.Category}</span>
                    </p>
                    <p className={style["price"]}>
                      Price Range: <span>{artistInfo.Range}</span>
                    </p>
                    <p className={style["location"]}>
                      Location: <span>{artistInfo.Location}</span>
                    </p>
                    <button
                      onClick={handleClick}
                      className={style["cta-button"]}
                    >
                      Ask for Quote
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style["artist-card-list-view"]}>
                  <div className={style["artist-image"]}>
                    <Image
                      src="/images/Hrithik.webp"
                      alt="Arijit Singh"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className={style["artist-info"]}>
                    <h2 className={style["artist-name"]}>{artistInfo.Name}</h2>
                    <div className={style["info-row"]}>
                      <label>Category:</label>
                      <span>{artistInfo.Category}</span>
                    </div>
                    <div className={style["info-row"]}>
                      <label>Price Range:</label>
                      <span>{artistInfo.Range}</span>
                    </div>
                    <div className={style["info-row"]}>
                      <label>Location:</label>
                      <span>{artistInfo.Location}</span>
                    </div>
                    <button className={style["cta-button"]}>
                      Ask for Quote
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
      </div>

      <nav className={style["pagination-container"]}>
        <Image
          className={style["pagination-previous"]}
          src="/images/pagination-previous-page-icon.svg"
          alt="navigate-to-previous-page"
          width={24}
          height={24}
          onClick={onPreviousButtonClicked}
        />
        <nav className={style["all-pages-button"]}>
          {Array.from({ length: Math.ceil(modifiedArtist.length / 12) }).map(
            (item, index) => (
              <button
                key={index}
                className={
                  startIndex === index ? style["selected-button-page"] : ""
                }
                onClick={() => onPageChangeButtonClicked(index)}
              >
                {index + 1}
              </button>
            )
          )}
        </nav>
        <Image
          className={style["pagination-next"]}
          src="/images/pagination-next-page-icon.svg"
          alt="navigate-to-next-page"
          width={24}
          height={24}
          onClick={onNextButtonClicked}
        />
      </nav>
    </main>
  );
}

export default CardComponent;
