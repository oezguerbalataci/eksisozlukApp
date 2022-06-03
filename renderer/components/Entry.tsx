import React from "react";
import { LikeOutlined, DislikeOutlined, UserOutlined } from "@ant-design/icons";
import parse from "html-react-parser";

export const Entry = ({ baslikToView }) => {
  return (
    <div>
      {baslikToView.entries.map((entry) => {
        return (
          <div className="flex flex-col shadow-lg p-4 m-3 " key={entry.id}>
            <p key={entry.id}>{parse(entry.body)}</p>
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
      })}
    </div>
  );
};

export default Entry;
