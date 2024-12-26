import React, { useEffect, useState } from "react";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";
import { getData } from "../reqiest";
import "../style/home.css";

const Gift = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState(null);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getStatusClass = (status) => {
    switch (status) {
      case "Свободен":
        return "free";
      case "Возможен сплит":
        return "split";
      case "Занят":
        return "busy";
      default:
        return "";
    }
  };

  const fetchGifts = async () => {
    try {
      const data = await getData(process.env.REACT_APP_MY_GIFT);
      setGifts(data);
    } catch (err) {
      setErrorMessage(err.message);
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
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

  return (
    <div className="gift-page">
      <div className="gift-list">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className={`gift-card ${getStatusClass(gift.status_gift)}`}
            onClick={() => setSelectedGift(gift)}
          >
            <div className="gift-header">
              <h3 className="gift-title">{gift.name}</h3>
              <p className="gift-price">{gift.price} ₽</p>
            </div>
            <span className={`gift-status ${getStatusClass(gift.status_gift)}`}>
              {gift.status_gift}
            </span>
          </div>
        ))}
      </div>

      {selectedGift && (
        <div className="modal-overlay" onClick={() => setSelectedGift(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="gift-title">{selectedGift.name}</h3>
            <p className="gift-description">{selectedGift.description}</p>
            <a
              href={selectedGift.link}
              target="_blank"
              rel="noopener noreferrer"
              className="gift-link"
            >
              {selectedGift.link}
            </a>
            <p className="gift-priority">Приоритет: {selectedGift.priority}</p>
            <p className="gift-date">
              Дата:{" "}
              {new Date(selectedGift.expiration_date).toLocaleDateString(
                "ru-RU",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              )}
            </p>
            <p className="gift-price">Цена: {selectedGift.price} ₽</p>
          </div>
        </div>
      )}

      <SuccessToast
        message={successMessage}
        visible={successVisible}
        onClose={() => setSuccessVisible(false)}
      />

      <ErrorToast
        message={errorMessage}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
    </div>
  );
};

export default Gift;
