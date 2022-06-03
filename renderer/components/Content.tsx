import React from "react";
import { useState } from "react";
import axios from "axios";
import Entry from "./Entry";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  RedditSquareFilled,
} from "@ant-design/icons";
import { ipcRenderer } from "electron/renderer";

const Content = ({
  isMoreClicked,
  setMainPage,
  setIsMoreClicked,
  baslikToView,
  setIsLoading,
  setBaslikToView,
  setClicked,
  clicked,
  bugunClicked,
  setBugunClicked,
  mainPage,
}) => {
  const [selected, setSelected] = useState(0);
  const handleMore = () => {
    setIsLoading(true);
    setIsMoreClicked(true);
    setClicked(false);
    setBugunClicked(false);
    setBaslikToView(mainPage);
    setIsLoading(false);
  };

  const handleBugunClick = () => {
    setIsLoading(true);
    axios
      .get(
        `https://ekssi.herokuapp.com/api/baslik/${baslikToView.slug}?a=dailynice`
      )
      .then((res) => {
        if (res.data) {
          setBaslikToView(res.data);
          setIsLoading(false);
        }
      });

    setBugunClicked(!bugunClicked);
    setClicked(false);
  };

  const handleSukelaClick = () => {
    setIsLoading(true);
    if (!clicked) {
      axios
        .get(
          `https://ekssi.herokuapp.com/api/baslik/${baslikToView.slug}?a=nice`
        )
        .then((res) => {
          if (res.data) {
            setBaslikToView(res.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {});
    } else {
      axios
        .get(`https://ekssi.herokuapp.com/api/baslik/${baslikToView.slug}`)
        .then((res) => {
          if (res.data) {
            setBaslikToView(res.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setBugunClicked(false);
    setClicked(!clicked);
  };

  const handleOnChange = (e) => {
    setIsLoading(true);
    if (isMoreClicked) {
      axios
        .get(
          `https://ekssi.herokuapp.com/api/baslik/${baslikToView.slug}?p=${
            Number(e.target.value) + 1
          }`
        )
        .then((res) => {
          if (res.data) {
            setBaslikToView(res.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          `https://ekssi.herokuapp.com/api/baslik/${
            baslikToView.slug
          }?a=popular&p=${Number(e.target.value) + 1}`
        )
        .then((res) => {
          setBaslikToView(res.data);
          setIsLoading(false);
        });
    }
  };

  const lastPageClick = () => {
    setIsLoading(true);
    if (isMoreClicked) {
      axios
        .get(
          `https://ekssi.herokuapp.com/api/baslik/${baslikToView.slug}?p=${baslikToView.total_page}`
        )
        .then((res) => {
          if (res.data) {
            setBaslikToView(res.data);
            setIsLoading(false);
          }
        });
    } else {
      axios
        .get(
          `https://ekssi.herokuapp.com/api/baslik/${baslikToView.slug}?a=popular&p=${baslikToView.total_page}`
        )
        .then((res) => {
          if (res.data) {
            setBaslikToView(res.data);
            setIsLoading(false);
          }
        });
    }
  };

  const handlePrevClick = () => {
    setIsLoading(true);
    if (isMoreClicked) {
      axios
        .get(
          `https://ekssi.herokuapp.com/api/baslik/${baslikToView.slug}?p=${
            baslikToView.current_page - 1
          }`
        )
        .then((res) => {
          if (res.data) {
            setBaslikToView(res.data);
            setIsLoading(false);
          }
        });
    } else {
      axios
        .get(
          `https://ekssi.herokuapp.com/api/baslik/${
            baslikToView.slug
          }?a=popular&p=${baslikToView.current_page - 1}`
        )
        .then((res) => {
          if (res.data) {
            setBaslikToView(res.data);
            setIsLoading(false);
          }
        });
    }
  };

  const handleNextClick = () => {
    setIsLoading(true);
    if (isMoreClicked) {
      axios
        .get(
          `https://ekssi.herokuapp.com/api/baslik/${baslikToView.slug}?p=${
            baslikToView.current_page + 1
          }`
        )
        .then((res) => {
          if (res.status === 200) {
            setBaslikToView(res.data);
            setIsLoading(false);
          }
        });
    } else {
      axios
        .get(
          `https://ekssi.herokuapp.com/api/baslik/${
            baslikToView.slug
          }?a=popular&p=${baslikToView.current_page + 1}`
        )
        .then((res) => {
          if (res.data) {
            setBaslikToView(res.data);
            setIsLoading(false);
          }
        });
    }
  };

  const handleSelect = () => {
    setIsLoading(true);
    axios
      .get(
        `https://ekssi.herokuapp.com/api/baslik/${baslikToView.slug}?a=popular&p=${baslikToView.current_page}`
      )
      .then((res) => {
        if (res.data) {
          setBaslikToView(res.data);
          setIsLoading(false);
        }
      });
  };

  return (
    <div className=" rounded w-full ">
      <h1 className="font-bold mb-8 text-xl text-center">
        {baslikToView.title}
      </h1>
      <div className="flex m-4 justify-between space-x-2">
        <div className="flex items-center space-x-1">
          <label>şükela:</label>
          <button
            className={
              clicked
                ? "text-green-800 hover:underline"
                : "hover:underline text-black"
            }
            onClick={() => {
              return handleSukelaClick();
            }}
          >
            tümü
          </button>
          <button
            onClick={handleBugunClick}
            className={
              bugunClicked
                ? "text-green-800 hover:underline"
                : "text-black hover:underline"
            }
          >
            | bugün
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {baslikToView.current_page > 1 && (
            <button
              className="h-8 w-12 border border-gray-200 hover:bg-gray-200 rounded"
              onClick={handlePrevClick}
            >
              <DoubleLeftOutlined />
            </button>
          )}
          <select
            onChange={handleOnChange}
            className="h-8 w-16 border rounded bg-gray-200 hover:bg-gray-300 border-gray-200"
            defaultValue={baslikToView.current_page - 1}
          >
            {Array.from(Array(baslikToView.total_page).keys()).map((page) => (
              <option key={page} value={page}>
                {page + 1}
              </option>
            ))}
          </select>

          <p>/</p>
          <button
            onClick={lastPageClick}
            className="h-8 w-12 border border-gray-200 hover:bg-gray-200 rounded"
          >
            {baslikToView.total_page}
          </button>
          {baslikToView.current_page < baslikToView.total_page && (
            <button
              onClick={handleNextClick}
              className="h-8 w-12 border border-gray-200 hover:bg-gray-200 rounded"
            >
              <DoubleRightOutlined />
            </button>
          )}
        </div>
      </div>

      {mainPage.total_page > baslikToView.total_page && (
        <div className="flex justify-center  items-center w-full ">
          <button
            onClick={handleMore}
            className="px-20 w-full m-2 hover:bg-gray-300 border border-gray-400 rounded"
          >
            {mainPage.total_page - baslikToView.total_page} sayfa daha
          </button>
        </div>
      )}

      <Entry
        setMainPage={setMainPage}
        setIsLoading={setIsLoading}
        setBaslikToView={setBaslikToView}
        baslikToView={baslikToView}
      />
    </div>
  );
};

export default Content;
