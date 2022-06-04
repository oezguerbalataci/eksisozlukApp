// @ts-nocheck

import React from "react";
import { LikeOutlined, DislikeOutlined, UserOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import axios from "axios";

const ParseAndReplace = ({
  html,
  setMainPage,
  setBaslikToView,
  setIsLoading,
  baslikToView,
}) => {
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
}) => {
  // parse and replace a tag with button tag

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
                <span className="flex font-medium text-sm ">
                  <LikeOutlined style={{ color: "#81c14b" }} />
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
                  <UserOutlined className="pb-1" />
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
