import produce from "immer";

export const initialState = {
  hasMoreVideo: true,
  getVideosLoading: false, // 비디오 가져오기 시도중
  getVideosDone: false,
  getVideosError: null,
  getOneVideoLoading: false, // 비디오삭제 시도중
  getOneVideoDone: false,
  getOneVideoError: null,
  addVideoLoading: false, // 비디오추가 시도중
  addVideoDone: false,
  addVideoError: null,
  updateVideoLoading: false, // 비디오수정 시도중
  updateVideoDone: false,
  updateVideoError: null,
  deleteVideoLoading: false, // 비디오삭제 시도중
  deleteVideoDone: false,
  deleteVideoError: null,
  searchWord: "",
  nowPlayList: null,
  playList: [],
};

export const ADD_VIDEO_REQUEST = "ADD_VIDEO_REQUEST";
export const ADD_VIDEO_SUCCESS = "ADD_VIDEO_SUCCESS";
export const ADD_VIDEO_FAILURE = "ADD_VIDEO_FAILURE";

export const GET_VIDEOS_REQUEST = "GET_VIDEOS_REQUEST";
export const GET_VIDEOS_SUCCESS = "GET_VIDEOS_SUCCESS";
export const GET_VIDEOS_FAILURE = "GET_VIDEOS_FAILURE";

export const LOAD_VIDEOS_REQUEST = "LOAD_VIDEOS_REQUEST";
export const LOAD_VIDEOS_SUCCESS = "LOAD_VIDEOS_SUCCESS";
export const LOAD_VIDEOS_FAILURE = "LOAD_VIDEOS_FAILURE";

export const MODIFY_VIDEO_REQUEST = "MODIFY_VIDEO_REQUEST";
export const MODIFY_VIDEO_SUCCESS = "MODIFY_VIDEO_SUCCESS";
export const MODIFY_VIDEO_FAILURE = "MODIFY_VIDEO_FAILURE";

export const DELETE_VIDEO_REQUEST = "DELETE_VIDEO_REQUEST";
export const DELETE_VIDEO_SUCCESS = "DELETE_VIDEO_SUCCESS";
export const DELETE_VIDEO_FAILURE = "DELETE_VIDEO_FAILURE";

export const GET_ONE_VIDEO_REQUEST = "GET_ONE_VIDEO_REQUEST";
export const GET_ONE_VIDEO_SUCCESS = "GET_ONE_VIDEO_SUCCESS";
export const GET_ONE_VIDEO_FAILURE = "GET_ONE_VIDEO_FAILURE";

export const SET_NOW_VIDEO_REQUEST = "SET_NOW_VIDEO_REQUEST";
export const SET_VIDEO_CHANGE = "SET_VIDEO_CHANGE";

export const getOneVideoRequestAction = (data) => ({
  type: GET_ONE_VIDEO_REQUEST,
  data,
});
export const addVideoRequestAction = (data) => ({
  type: ADD_VIDEO_REQUEST,
  data,
});
export const deleteVideoRequestAction = (data) => ({
  type: DELETE_VIDEO_REQUEST,
  data,
});
export const updateVideoRequestAction = (data) => ({
  type: MODIFY_VIDEO_REQUEST,
  data,
});
export const loadVideosRequestAction = (data) => ({
  type: LOAD_VIDEOS_REQUEST,
  data,
});
export const getVideosRequestAction = (data) => ({
  type: GET_VIDEOS_REQUEST,
  data,
});
export const setNowVideoRequestAction = (data) => ({
  type: SET_NOW_VIDEO_REQUEST,
  data,
});
export const setVideoChangeRequestAction = (data) => ({
  type: SET_VIDEO_CHANGE,
  data,
});

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_ONE_VIDEO_REQUEST:
        draft.getOneVideoLoading = true;
        draft.getOneVideoDone = false;
        draft.getOneVideoError = null;
        break;
      case GET_ONE_VIDEO_SUCCESS:
        draft.getOneVideoLoading = false;
        draft.getOneVideoDone = true;
        draft.nowPlayList = action.data;
        break;
      case GET_ONE_VIDEO_FAILURE:
        draft.getOneVideoLoading = false;
        draft.getOneVideoError = action.error;
        break;
      case GET_VIDEOS_REQUEST:
        draft.getVideosLoading = true;
        draft.getVideosDone = false;
        draft.getVideosError = null;
        break;
      case GET_VIDEOS_SUCCESS:
        draft.getVideosLoading = false;
        draft.getVideosDone = true;
        draft.playList = action.data;
        break;
      case GET_VIDEOS_FAILURE:
        draft.getVideosLoading = false;
        draft.getVideosError = action.error;
        break;

      case ADD_VIDEO_REQUEST:
        draft.addVideoLoading = true;
        draft.addVideoDone = false;
        draft.addVideoError = null;
        break;
      case ADD_VIDEO_SUCCESS:
        draft.addVideoLoading = false;
        draft.addVideoDone = true;
        draft.playList.unshift(action.data);
        break;
      case ADD_VIDEO_FAILURE:
        draft.addVideoLoading = false;
        draft.addVideoError = action.error;
        break;

      case LOAD_VIDEOS_REQUEST:
        draft.loadVideosLoading = true;
        draft.loadVideosDone = false;
        draft.loadVideosError = null;
        break;
      case LOAD_VIDEOS_SUCCESS:
        draft.loadVideosLoading = false;
        draft.loadVideosDone = true;
        draft.playList = draft.playList.concat(action.data);
        draft.hasMoreVideo = action.data.length === 20;
        break;
      case LOAD_VIDEOS_FAILURE:
        draft.loadVideosLoading = false;
        draft.loadVideosError = action.error;
        break;

      case MODIFY_VIDEO_REQUEST:
        draft.updateVideoLoading = true;
        draft.updateVideoDone = false;
        draft.updateVideoError = null;
        break;
      case MODIFY_VIDEO_SUCCESS:
        const findList = draft.playList.find((v) => v.id === action.data.id);
        if (findList) {
          findList.title = action.data.title;
          findList.author = action.data.author;
        }
        draft.nowPlayList = action.data;
        draft.updateVideoLoading = false;
        draft.updateVideoDone = true;
        break;
      case MODIFY_VIDEO_FAILURE:
        draft.updateVideoError = action.error;
        draft.updateVideoLoading = false;
        break;

      case DELETE_VIDEO_REQUEST:
        draft.deleteVideoLoading = true;
        draft.deleteVideoDone = false;
        draft.deleteVideoError = null;
        break;
      case DELETE_VIDEO_SUCCESS:
        draft.deleteVideoLoading = false;
        draft.deleteVideoDone = true;
        draft.playList = draft.playList.filter(
          (v) => v.id !== parseInt(action.data.id, 10)
        );
        break;
      case DELETE_VIDEO_FAILURE:
        draft.deleteVideoLoading = false;
        draft.deleteVideoError = action.error;
        break;

      case SET_NOW_VIDEO_REQUEST:
        const nowPlay = draft.playList.find((v) => v.id === action.data);
        draft.nowPlayList = nowPlay;
        break;

      default:
        break;
    }
  });
