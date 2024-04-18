import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../Css/Ranking.css';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  // Lấy dữ liệu xếp hạng từ API backend
  useEffect(() => {
    axios.get('/api/ranking')
      .then(res => res.json())
      .then(data => setRanking(data));
  }, []);

  return (
    <div className="ranking-page">
      <h2>Bảng xếp hạng blog được nhiều tim nhất</h2>
      <ul className="ranking-list">
        {ranking.map((story) => (
          <li key={story.storyId}>
            <Link to={`/story/${story.slug}`}>
              <h3>{story.title}</h3>
              <img src={story.image} alt={story.title} />
              <p className="likes">{story.likes} ❤️</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
