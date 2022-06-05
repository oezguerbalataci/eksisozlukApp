import React from "react";
import Link from "next/link";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import OutsideClickHandler from "react-outside-click-handler";
import Login from "./Login";

const Header = ({
  user,
  setUser,
  setBaslikToView,
  setIsLoading,
  setMainPage,
  setIsMoreClicked,
  uu1,
  uu2,
}) => {
  const [results, setResults] = useState([]);
  const [toSearch, setToSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  const handleChange = (e) => {
    setToSearch(e.target.value);
    search();
  };

  const ref = useRef(null);

  useEffect(() => {
    if (document.activeElement === ref.current) {
      setSearchFocus(true);
    } else {
      setSearchFocus(false);
    }
  });

  const handleSearchClick = async (title) => {
    setIsLoading(true);
    setIsMoreClicked(true);
    let newTitle = encodeURI(title);
    const response = await axios.get(
      `https://ekssi.herokuapp.com/api/baslik/${newTitle}`
    );
    setBaslikToView(response.data);
    setMainPage(response.data);
    setIsLoading(false);
    setToSearch("");
  };

  const search = async () => {
    const response = await axios.get(
      `https://ekssi.herokuapp.com/api/autocomplete/:${toSearch}`
    );
    setResults(response.data.Titles);
  };

  return (
    <div className="flex justify-between mt-10 mb-8 mr-3">
      <Link href="/home">
        <img
          className="object-contain w-32 "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Ek%C5%9Fi_S%C3%B6zl%C3%BCk_yeni_logo.svg/512px-Ek%C5%9Fi_S%C3%B6zl%C3%BCk_yeni_logo.svg.png"
        ></img>
      </Link>

      <div className="flex items-center  ">
        {!user ? (
          <Login uu1={uu1} uu2={uu2} setUser={setUser} user={user}></Login>
        ) : (
          <p className="mr-2 font-semibold">{user.nick}</p>
        )}
        <div className="shadow-lg border border-green-400  space-x-1 h-10 rounded-lg">
          <button className="bg-eksiyellow h-full rounded-lg w-9 mr-2 ">
            <SearchOutlined />
          </button>
          <input
            ref={ref}
            placeholder="Search a topic"
            className="h-full outline-0 pl-2"
            onChange={handleChange}
          />

          <OutsideClickHandler
            onOutsideClick={() => {
              setSearchFocus(false);
            }}
          >
            {toSearch && searchFocus && (
              <div className="absolute border border-gray-200 shadow-2xl rounded-xl">
                {results.map((result) => (
                  <div key={result} className="bg-white sshadow-s text">
                    <button
                      onClick={() => handleSearchClick(result)}
                      className="text-left p-2 hover:bg-gray-200 w-full"
                    >
                      {result}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </OutsideClickHandler>
        </div>
      </div>
    </div>
  );
};

export default Header;
