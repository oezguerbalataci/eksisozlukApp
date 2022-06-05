// @ts-nocheck
// @ts-ignore

import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import parse from "html-react-parser";
import axios from "axios";
import { useState } from "react";
import { bgcolor } from "@mui/system";
import IconButton from "@mui/material/IconButton";

const ParseAndReplace = ({
  html,
  setMainPage,
  setBaslikToView,
  setIsLoading,
  baslikToView,
}) => {
  const [like, setLike] = React.useState(0);

  const handleLink = async (link) => {
    setIsLoading(true);
    let linkEncode = encodeURI(link);

    console.log(`https://ekssi.herokuapp.com/api/baslik/${linkEncode}`);

    const response = await axios.get(
      `https://ekssi.herokuapp.com/api/baslik/${linkEncode}`
    );
    if (response.status !== 200) {
      return;
    }
    // console.log(response.status);
    setMainPage(response.data);
    setBaslikToView(response.data);
    console.log(baslikToView);
    setIsLoading(false);
  };
  return parse(html, {
    replace: ({ children, attribs }) => {
      if (attribs && attribs.href && attribs.href.startsWith("/")) {
        return (
          <button onClick={() => handleLink(children[0].data)}>
            <a>{children[0].data}</a>
          </button>
          // <a href={domNode.attribs.href}>{domNode.children[0].data}</a>
        );
      } else if (attribs && attribs.href && attribs.href.startsWith("http")) {
        return (
          <a target="_blank" href={attribs.href}>
            {children[0].data}
          </a>
        );
      }
    },
  });
};

export const Entry = ({
  baslikToView,
  setBaslikToView,
  setIsLoading,
  setMainPage,
  user,
  uu1,
  uu2,
}) => {
  // parse and replace a tag with button tag

  const handleLike = (id) => {
    var data = `Id=${id}`;
    var config = {
      method: "post",
      url: "https://api.eksisozluk.com/v2/entry/favorite",
      headers: {
        Host: "api.eksisozluk.com",
        "Client-Secret": `${uu1}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate",
        "User-Agent": "okhttp/3.12.1",
        Connection: "close",
        Authorization:
          "NAPR2Uv1vGJs9HvQ- Il0ptdjzuJdSQTlKpACdmXCvroTtjdm0DeVpyMP2t1L0psGxmXNfwNJVf8L4Rx1leMwvElzvxz0bD7fmaextcF4 - WfvYuZMTkX4dKOePZ1W1LUAGkYTWRSdgvYsUXwaZur9GhkXoHQNuSkP4jaL2ZtlpCIxP15PvpcB - DAgFzTIPqYXwn6v3TVS2skmDtPeaflO5Qe2rhykSEt54G37AHOQ1hLnWsQYkylEbwCXqPm3Y49B4XyO9rgYjnbeVflpWUwjyw",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(uu1);
        console.log(user);
        console.log(error);
      });
  };

  return (
    <div>
      {baslikToView?.entries !== null ? (
        baslikToView?.entries?.map((entry) => {
          return (
            <div className="flex flex-col shadow-lg p-4 m-3 " key={entry.id}>
              <p>
                <ParseAndReplace
                  baslikToView={baslikToView}
                  setIsLoading={setIsLoading}
                  setBaslikToView={setBaslikToView}
                  setMainPage={setMainPage}
                  html={entry.body}
                ></ParseAndReplace>
              </p>
              <div
                className="
              flex
              mt-5
              justify-between
              "
              >
                <span className="flex items-center font-medium text-sm ">
                  {user?.nick ? (
                    <IconButton onClick={() => handleLike(entry.id)}>
                      <FavoriteBorderIcon style={{ color: "green" }} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleLike(entry.id)}>
                      <FavoriteBorderIcon />
                    </IconButton>
                  )}

                  <p>{entry.fav_count}</p>
                </span>
                <span className="font-semibold text-right text-sm items-center  flex space-x-2">
                  <p className="font-normal text-xs text-gray-900">
                    {entry.created_at}
                  </p>
                  {entry.updated_at ? (
                    <p className="font-normal text-xs text-gray-900">
                      ~ {entry.updated_at}
                    </p>
                  ) : null}
                  <p>{entry.author}</p>
                  <PersonOutlineIcon className="pb-1" />
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <p>Bu baslikta henüz bir entry yok</p>
        </div>
      )}
    </div>
  );
};

export default Entry;
