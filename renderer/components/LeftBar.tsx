import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import axios from "axios";
import { useState, useEffect } from "react";

export default function LeftBar({
  setIsMoreClicked,
  baslikToView,
  basliklar,
  setBaslikToView,
  setIsLoading,
  setBugunClicked,
  setClicked,
  setBasliklar,
  setMainPage,
}) {
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/basliklar")
  //     .then((res) => {
  //       setBasliklar(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [basliklar]);

  const handleClick = async (slug) => {
    setIsLoading(true);
    setClicked(false);
    setIsMoreClicked(false);
    setBugunClicked(false);
    const res = await axios.get(
      `https://ekssi.herokuapp.com/api/baslik${slug}`
    );

    if (res.data.entries !== null) {
      setBaslikToView(res.data);
    }

    const res2 = await axios.get(`https://ekssi.herokuapp.com/api/basliklar`);

    if (res2.data.entries !== null) {
      setBasliklar(res2.data);
    }

    let tempSlug = slug.substring(0, slug.length - 10);
    const res3 = await axios.get(
      `https://ekssi.herokuapp.com/api/baslik${tempSlug}`
    );
    if (res3.data.entries !== null) {
      setMainPage(res3.data);
      // const res3 = await axios.get(
      //   `https://ekssi.herokuapp.com/api/baslik${slug}`
      // );
    }

    setIsLoading(false);
  };

  return (
    <div className="h-screen sticky top-0">
      <h2 className="font-bold text-center">başlıklar</h2>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          overflow: "auto",
          maxHeight: "100vh",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <li>
          <ul>
            {basliklar.map((baslik) => (
              <button
                onClick={() => handleClick(baslik.slug)}
                key={baslik.id}
                className="hover:bg-gray-100 w-full"
              >
                <ListItem className="flex space-x-5" key={baslik.id}>
                  <ListItemText primary={baslik.title} />
                  <p className=" text-xs ">{baslik.entry_count}</p>
                </ListItem>
              </button>
            ))}
          </ul>
        </li>
      </List>
    </div>
  );
}
