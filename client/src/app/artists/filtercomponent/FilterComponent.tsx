import Image from "next/image";
import "./FilterComponent.scss";
import { useDispatch } from "react-redux";
import { toggleFilterWindow } from "@/redux/filterSlice";
import { useEffect, useState } from "react";

function FilterComponent({
  setSelectedCategory,
  setSelectedLocation,
  setSelectedPrice,
  applyFilter,
  selectedCategory,
  selectedLocation,
  selectedPrice,
}) {
  const dispatch = useDispatch();

  const filterOptions = [
    {
      Category: ["Singer", "Dancer", "DJ", "Comedian", "Magician"],
    },
    { Location: ["India", "U.S.A", "U.K.", "Australia"] },
    { Price: [">50 Lakh", "30-50 Lakh", "10-30 Lakh", "<10 Lakh"] },
  ];
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    setCategory(selectedCategory);
    setLocation(selectedLocation);
    setPrice(selectedPrice);
  }, []);
  function onCloseButtonClicked() {
    dispatch(toggleFilterWindow());
  }
  const selectFilterValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "Category") {
      setCategory(e.target.value);
    } else {
      if (e.target.name === "Location") {
        setLocation(e.target.value);
      } else {
        setPrice(e.target.value);
      }
    }

    // You can use these values for filtering or sending to backend
  };
  function handleApplyFilters() {
    setSelectedCategory(category);
    setSelectedLocation(location);
    setSelectedPrice(price);
    applyFilter();
  }
  function resetFilter() {
    setCategory("");
    setLocation("");
    setPrice("");
  }

  return (
    <section id="material-filter-system">
      <div id="filter-cancel" onClick={onCloseButtonClicked}>
        <span className="toggle-filter-window" role="button">
          Close
        </span>
        <Image
          className="toggle-filter-window"
          alt="cross-icon"
          src="/images/cancel-icon-red.svg"
          width={24}
          height={24}
        />
      </div>
      <div id="material-filter-header">
        <h3 role="heading" id="filter-heading">
          Filter
        </h3>
        <p aria-labelledby="filter-heading" role="contentinfo">
          Tailored 3D printing solutions to meet specific client needs
        </p>
      </div>
      <hr role="separator" />

      {filterOptions.map((filterData, index) => (
        <fieldset key={index} id="technology" className="common-filter">
          <button className="selected-button">
            <span>{Object.keys(filterData)[0]}</span>
          </button>
          <div role="menu" className="menu">
            {filterData[Object.keys(filterData)[0]].map((list, index) => (
              <div key={index} className="menuitemcheckbox">
                <input
                  type="radio"
                  name={Object.keys(filterData)[0]}
                  value={list}
                  id={list}
                  checked={
                    category == list || location == list || price == list
                  }
                  onChange={selectFilterValues}
                />
                <label htmlFor={list}>{list}</label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}

      <div id="material-filter-button" aria-label="filter-buttons">
        <button
          className="toggle-filter-window"
          id="apply-button"
          onClick={() => {
            onCloseButtonClicked();
            handleApplyFilters();
          }}
        >
          <span>Apply</span>
        </button>
        <button id="reset-all-button" onClick={resetFilter}>
          Reset All
        </button>
      </div>
    </section>
  );
}

export default FilterComponent;
