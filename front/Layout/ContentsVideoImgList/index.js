import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { loadVideosRequestAction } from "../../reducers/video";
import { StFixedButton } from "../AppLayout/styles";
import Loading from "../../components/Loading";
import VideoImageCard from "../../components/VideoImageCard";
import { StVideoImgList } from "./styles";
import { popupOpenRequestAction } from "../../reducers/user";
import UpdateVideoPopup from "../../components/UpdateVideoPopup";
import AddVideoPopup from "../../components/AddVideoPopup";

const ContentsVideoImgList = ({ mini }) => {
  if (mini !== true) {
    mini = false;
  }
  const dispatch = useDispatch();
  const playList = useSelector((state) => state.video.playList);
  const hasMoreVideo = useSelector((state) => state.video.hasMoreVideo);
  const loadVideosLoading = useSelector(
    (state) => state.video.loadVideosLoading
  );
  const router = useRouter();

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreVideo && !loadVideosLoading) {
          const lastNum = playList.length - 1;
          dispatch(
            loadVideosRequestAction({
              lastId: playList[lastNum].id,
              word: router.query.word || "",
            })
          );
        }
      }
    }
    if (playList) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [playList, hasMoreVideo, loadVideosLoading]);

  const onClickAddMusic = useCallback(() => {
    dispatch(
      popupOpenRequestAction({
        key: "addVideo",
        value: null,
      })
    );
  }, []);

  return (
    <>
      {playList && (
        <StVideoImgList>
          {playList.map((v) => (
            <VideoImageCard key={v.id} data={v} mini={mini} />
          ))}
        </StVideoImgList>
      )}

      {loadVideosLoading && <Loading center />}

      <AddVideoPopup />
      <UpdateVideoPopup />

      <StFixedButton onClick={onClickAddMusic} />
    </>
  );
};

ContentsVideoImgList.propTypes = {
  mini: PropTypes.bool,
};

export default React.memo(ContentsVideoImgList);
