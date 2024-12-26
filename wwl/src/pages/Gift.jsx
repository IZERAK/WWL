import React, { useEffect, useState } from "react";
import { getData } from "../reqiest";
import "../style/gift.css";

const Gift = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGifts = async () => {
    try {
      const data = await getData(process.env.REACT_APP_MY_GIFT);
      setGifts(data);
    } catch (err) {
      setError(err.message);
      console.error("Ошибка при загрузке подарков:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  if (loading) {
    return <div className="gift-page">Загрузка...</div>;
  }

  if (error) {
    return <div className="gift-page">Ошибка: {error}</div>;
  }

  return (
    <div className="gift-page">
      <div className="table">
        <div className="header-table">Список подарков</div>
        <div className="row-table">
          {gifts.map((gift) => (
            <div key={gift.id} className="gift-item">
              <div className="gift-name">{gift.name}</div>
              <div className="gift-description">{gift.description}</div>
              <div className="gift-price">Цена: {gift.price} ₽</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gift;
