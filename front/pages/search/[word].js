import { END } from "redux-saga";
import React from "react";
import { NextSeo } from "next-seo";
import axios from "axios";
import { getVideosRequestAction } from "../../reducers/video";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import AppLayout from "../../Layout/AppLayout";
import { StContainer, StWrapper } from "../../Layout/AppLayout/styles";
import ContentsVideoImgList from "../../Layout/ContentsVideoImgList";

const SearchWord = () => (
  <>
    <NextSeo title="YTList Search" description="Search for various videos." />
    <AppLayout>
      <StWrapper>
        <StContainer>
          <ContentsVideoImgList />
        </StContainer>
      </StWrapper>
    </AppLayout>
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    if (cookie) {
      context.store.dispatch(
        getVideosRequestAction({
          word: context.query.word || "",
        })
      );
    }

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default SearchWord;
