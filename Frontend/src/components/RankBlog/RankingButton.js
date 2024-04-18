import React from 'react';
import { Link } from 'react-router-dom';

const RankingButton = () => {
  return (
    <Link to="/ranking">
      <button>Bảng xếp hạng</button>
    </Link>
  );
};

export default RankingButton;
