import React, { useCallback, useEffect, useRef, useState } from "react";
import { CgProfile, CgSearch } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../features/appSlice";
import { cacheResults } from "../features/searchSlice";
import { YOUTUBE_SEARCH_API } from "../utils/contants";
import { RxHamburgerMenu } from "react-icons/rx";

function Head() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const suggestionsRef = useRef();

  const handleSidebar = () => {
    dispatch(toggleMenu());
  };

  /**
   *  searchCache = {
   *     "iphone": ["iphone 11", "iphone 14"]
   *  }
   *  searchQuery = iphone
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }

      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSugsestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  // const getSearchSugsestions = async () => {
  //   const data = await fetch("http://localhost:5000/api/search" + searchQuery);
  //   const json = await data?.json();
  //   // console.log(json[1]);
  //   setSuggestions(json[1]);

  // update cache
  // dispatch(
  //   cacheResults({
  //     [searchQuery]: json[1],
  //   })
  // );
  // };

  const getSearchSugsestions = async () => {
    if (!searchQuery.trim()) return setSuggestions([]);

    try {
      const response = await fetch(YOUTUBE_SEARCH_API + searchQuery, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response?.json();
      setSuggestions(json[1]);

      dispatch(
        cacheResults({
          [searchQuery]: json[1],
        })
      );
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const handleClick = useCallback(
    (suggestion) => {
      if (suggestion) {
        dispatch(cacheResults({ currentQuery: suggestion }));
        setSearchQuery(suggestion);
        setShowSuggestions(false);
      }
    },
    [dispatch]
  );

  const handleBlur = (e) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(e.relatedTarget)
    ) {
      setShowSuggestions(false);
    }
  };

  const uniqueSuggestions = [...new Set(suggestions)];

  return (
    <div className="grid grid-cols-12 gap-4 m-2 md:m-4">
      <div className="flex items-center col-span-3 md:col-span-2">
        <RxHamburgerMenu
          onClick={handleSidebar}
          className="mr-2 text-3xl cursor-pointer "
          alt="hamburger"
        />
        <img
          className="h-6 cursor-pointer md:h-8"
          alt="youtubelogo"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>

      <div className="relative col-span-7 md:col-span-8">
        <div className="flex">
          <input
            className="w-full p-1 px-2 border border-gray-400 rounded-l-full md:p-2 md:px-5"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
          />
          <button
            onClick={() => handleClick(searchQuery)}
            className="px-3 py-1 bg-gray-100 border border-gray-400 rounded-r-full md:px-5 md:py-2"
          >
            🔍
          </button>
        </div>
        {showSuggestions && searchQuery && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full px-2 py-2 bg-white border border-gray-100 rounded-lg shadow-lg"
          >
            <ul>
              {uniqueSuggestions.map((s) => (
                <li
                  key={s}
                  className="px-3 py-2 shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleClick(s)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end col-span-2">
        <CgProfile className="text-xl md:text-2xl" />
      </div>
    </div>
  );
}

export default Head;
