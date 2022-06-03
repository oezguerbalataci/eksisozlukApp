import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import LeftBar from "../components/LeftBar";
import Content from "../components/Content";
import { useState, useEffect } from "react";
// import Services from "../utils/Services";
import axios from "axios";
import Container from "@mui/material/Container";
import Loading from "../components/Loading";

function Home() {
  const [basliklar, setBasliklar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [baslikToView, setBaslikToView] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [bugunClicked, setBugunClicked] = useState(false);
  const [mainPage, setMainPage] = useState(null);
  const [isMoreClicked, setIsMoreClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://ekssi.herokuapp.com/api/basliklar"
      );
      setBasliklar(response.data);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Eksisozluk</title>
      </Head>

      <Container className="container">
        <Header
          setMainPage={setMainPage}
          setIsLoading={setIsLoading}
          setBaslikToView={setBaslikToView}
          setIsMoreClicked={setIsMoreClicked}
        ></Header>

        <div className="flex">
          <LeftBar
            setIsLoading={setIsLoading}
            setBaslikToView={setBaslikToView}
            basliklar={basliklar}
            baslikToView={baslikToView}
            setClicked={setClicked}
            setBugunClicked={setBugunClicked}
            setBasliklar={setBasliklar}
            setMainPage={setMainPage}
            setIsMoreClicked={setIsMoreClicked}
          ></LeftBar>
          {/* {isLoading ? ( */}
          {/*   <div>Is loading</div> */}
          {/* ) : ()} */}
          {!isLoading ? (
            <Content
              setMainPage={setMainPage}
              setBaslikToView={setBaslikToView}
              mainPage={mainPage}
              setIsLoading={setIsLoading}
              baslikToView={baslikToView}
              clicked={clicked}
              setClicked={setClicked}
              bugunClicked={bugunClicked}
              setBugunClicked={setBugunClicked}
              setIsMoreClicked={setIsMoreClicked}
              isMoreClicked={isMoreClicked}
            ></Content>
          ) : (
            <Loading />
          )}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Home;
