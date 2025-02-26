import axios from 'axios';

const getList = async () => {
    console.log("getList 호출");
    try {
      const response = await axios.get(`/api/board/list`);
      console.log("받아온 데이터:", response.data);
      return response.data; 
    } catch (error) {
      return null;
    }
  };

  const write = async (title,writer,content) => {
    console.log("write 호출");
    try {
      const response = await axios.post(`/api/board/write`,{
        title,
        writer,
        content
      });
      return response.data; 
    } catch (error) {
      return null;
    }
  };
  const getBoardDetail = async (boardIdx) => {
    try {
      const response = await axios.get(`/api/board/${boardIdx}`);
      return response.data; 
    } catch (error) {
      console.error('게시글 조회 실패:', error);
      return null;
    }
  };

  const writeComment = async (board_idx,writer,content) => {
    console.log("write 호출");
    try {
      const response = await axios.post(`/api/comment/write`,{
        board_idx,
        writer,
        content
      });
      return response.data; 
    } catch (error) {
      return null;
    }
  };
export default {getList, write, getBoardDetail,writeComment};
