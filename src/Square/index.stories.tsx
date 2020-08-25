import React from 'react';
import { Square } from '.';
import '../index.css';

export default {
  title: 'Square',
  component: Square,
};

export const Empty = () => <Square onClick={() => {}} value={null} />;

export const Filled = () => <Square onClick={() => {}} value={'X'} />;
