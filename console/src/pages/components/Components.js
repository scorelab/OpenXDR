import React, { } from 'react';

import './Components.css';
import PageToolbar from '../../components/PageToolbar';
import ComponentList from './ComponentList';
import { Container } from '@mui/material';

function Components() {

  return (
    <div className="Components">
      <PageToolbar title="Components" />
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <ComponentList />
      </Container>
    </div>
  );
}

export default Components;
