import React from 'react';
import PropTypes from 'prop-types';
import HeaderLayout from './HeaderLayout';
import { StWrapper } from '../../style/components/AppLayout';

const AppLayout = ({ children }) => (
  <>
    <HeaderLayout />
    <StWrapper>
      { children }
    </StWrapper>
  </>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
