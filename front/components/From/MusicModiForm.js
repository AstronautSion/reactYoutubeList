import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { StInput, StLable } from '../../style/Form';
import { StFieldset } from '../../style/components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';

const StMusicModiForm = styled.div`
  
`;

const MusicModiForm = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.user.popup.data);
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  useEffect(() => {
    console.log(data)
    setTitle(data.title);
    setAuthor(data.author);
    setLink(data.musicUrl);
  },[data]);
  const onChangeMusicTitle = (e) => {
    setTitle(e.target.value);
  }
  const onChangeMusicAuthor = (e) => {
    setAuthor(e.target.value);
  }
  const onSubmitModiMusicList = (e) =>{
    e.preventDefault();

    dispatch()
  }
  return(
    <StMusicModiForm>
    <form onSubmit={onSubmitModiMusicList}>
    <StFieldset>
        <StLable>Link</StLable>
        <StInput value={link} readOnly/>
      </StFieldset>
      <StFieldset>
        <StLable>Title</StLable>
        <StInput value={title} onChange={onChangeMusicTitle} minLength="1" maxLength="30" required/>
      </StFieldset>
      <StFieldset>
        <StLable>Author</StLable>
        <StInput value={author} onChange={onChangeMusicAuthor} minLength="1" maxLength="30" required/>
      </StFieldset>
      <button type="submit">수정</button>
    </form>
    </StMusicModiForm>
  );
}

MusicModiForm.propTypes = {
  data: PropTypes.object.isRequired,
}

export default MusicModiForm;