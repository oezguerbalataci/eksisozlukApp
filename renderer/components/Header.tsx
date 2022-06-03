import React from "react";
import Link from "next/link";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const Header = ({ setBaslikToView, setIsLoading }) => {
  const [token, setToken] = useState("");
  const [results, setResults] = useState([]);
  const [toSearch, setToSearch] = useState("");

  const handleChange = (e) => {
    setToSearch(e.target.value);
    search();
  };

  const handleSearchClick = (title) => {
    setIsLoading(true);
    let newTitle = encodeURI(title);

    const response = axios
      .get(`https://ekssi.herokuapp.com/api/baslik/${newTitle}`)
      .then((res) => {
        setBaslikToView(res.data);
        console.log(`https://ekssi.herokuapp.com/api/baslik/${newTitle}`);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const search = async () => {
    const response = await axios.get(
      `https://ekssi.herokuapp.com/api/autocomplete/:${toSearch}`
    );
    setResults(response.data.Titles);
    console.log(response.data);
  };

  return (
    <div className="flex  justify-between m-5 ">
      <Link href="/home">
        <img
          className="object-contain w-32 "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Ek%C5%9Fi_S%C3%B6zl%C3%BCk_yeni_logo.svg/512px-Ek%C5%9Fi_S%C3%B6zl%C3%BCk_yeni_logo.svg.png"
        ></img>
      </Link>
      <div className="shadow-lg">
        <button className="bg-green-200">
          <SearchOutlined />
        </button>
        <input placeholder="Search a topic" onChange={handleChange} />
        {toSearch && (
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
      </div>
    </div>
  );
};

export default Header;
