import React, { useState, useRef } from "react";

import Field from "/components/Field";
import Label from "/components/Label";

const Filter = ({ categories, setCurrentCategory }) => {
  const categoryRef = useRef({});
  const [currentFilter, setCurrentFilter] = useState(0);

  const filterButton = (i) => {
    setCurrentFilter(i);
    setCurrentCategory(categoryRef.current[i]);

    toggleFilterButton(i);
  };

  const filterButtonEnter = (i) => {
    categoryRef.current[i].style.background = "var(--color-black)";
    categoryRef.current[i].style.borderColor = "var(--color-black)";
    categoryRef.current[i].style.color = "var(--color-white)";
  };
  const filterButtonLeave = (i) => {
    categoryRef.current[i].style.background = "var(--color-white)";
    categoryRef.current[i].style.borderColor = "var(--color-black)";
    categoryRef.current[i].style.color = "var(--color-black)";
    // keep current filter selected
    categoryRef.current[currentFilter].style.background = "var(--color-black)";
    categoryRef.current[currentFilter].style.borderColor = "var(--color-black)";
    categoryRef.current[currentFilter].style.color = "var(--color-white)";
  };

  const toggleFilterButton = (i) => {
    {
      categories.map(
        ({ tag }, l) => (
          (categoryRef.current[l].style.background = "var(--color-white)"),
          (categoryRef.current[l].style.borderColor = "var(--color-black)"),
          (categoryRef.current[l].style.color = "var(--color-black)")
        )
      );
    }
    categoryRef.current[i].style.background = "var(--color-black)";
    categoryRef.current[i].style.borderColor = "var(--color-black)";
    categoryRef.current[i].style.color = "var(--color-white)";
  };

  return (
    <div className="flex sticky top-md py-sm pr-[0px] sm:pr-xl gap-sm border-b-2 border-black bg-white z-10">
      <Field>
        <Label>Filter</Label>
        <div className="flex flex-wrap gap-xs">
          {categories.map(({ tag }, i) => (
            <button
              key={tag}
              ref={(element) => (categoryRef.current[i] = element)}
              className="first:text-white first:bg-black font-sans text-xs text-black hover:text-white bg-white hover:bg-black border-2 rounded-[5px] border-black text-center px-[12px] py-[5px]"
              onClick={() => {
                filterButton(i);
              }}
              onMouseEnter={() => {
                filterButtonEnter(i);
              }}
              onMouseLeave={() => {
                filterButtonLeave(i);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
};

export default Filter;
