import React, { useEffect, useState } from "react";
import { ReactComponent as EditImg } from "../images/edit.svg";
import { ReactComponent as AddImg } from "../images/add.svg";
import Input from "../components/Input";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";
import { getData, deleteData, postData } from "../reqiest";
import "../style/gift.css";

const Gift = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newGift, setNewGift] = useState({
    name: "",
    price: "",
    description: "",
    link: "",
    priority: 1,
    expiration_date: "",
  });

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

  const handleDelete = async () => {
    try {
      await deleteData(
        `${process.env.REACT_APP_DELETE_GIFT}${selectedGift.gift_id}`
      );
      setGifts((prevGifts) =>
        prevGifts.filter((gift) => gift.gift_id !== selectedGift.gift_id)
      );
      setSuccessMessage("Подарок успешно удален!");
      setSuccessVisible(true);
      setTimeout(() => setSuccessVisible(false), 3000);
      setSelectedGift(null);
      setConfirmVisible(false);
    } catch (err) {
      const serverErrorMessage =
        err.response?.data?.error || "Не удалось удалить подарок.";
      setErrorMessage(serverErrorMessage);
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    }
  };

  const handleEdit = (id) => {
    console.log("Редактирование подарка с ID:", id);
  };

  const handleAddGift = async () => {
    try {
      const addedGift = await postData(process.env.REACT_APP_ADD_GIFT, newGift);
      setGifts((prevGifts) => [...prevGifts, addedGift]);
      setSuccessMessage("Подарок успешно добавлен!");
      setSuccessVisible(true);
      setTimeout(() => setSuccessVisible(false), 3000);
      setAddModalVisible(false);
      setNewGift({
        name: "",
        price: "",
        description: "",
        link: "",
        priority: 1,
        expiration_date: "",
      });
    } catch (err) {
      const serverErrorMessage =
        err.response?.data?.error || "Не удалось добавить подарок.";
      setErrorMessage(serverErrorMessage);
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
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
            className="gift-card"
            onClick={() => setSelectedGift(gift)}
          >
            <h3 className="gift-title">{gift.name}</h3>
            <p className="gift-price">{gift.price} ₽</p>
          </div>
        ))}
      </div>

      {selectedGift && (
        <div className="modal-overlay" onClick={() => setSelectedGift(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="edit-button"
              onClick={() => handleEdit(selectedGift.gift_id)}
            >
              <EditImg className="action-icon" />
            </button>
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
            <button
              className="delete-button"
              onClick={() => setConfirmVisible(true)}
            >
              Удалить
            </button>
          </div>
        </div>
      )}

      {confirmVisible && (
        <div className="modal-overlay" onClick={() => setConfirmVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Подтверждение удаления</h3>
            <p>Вы уверены, что хотите удалить подарок?</p>
            <div className="confirm-buttons">
              <button className="confirm-yes-button" onClick={handleDelete}>
                Да
              </button>
              <button
                className="confirm-no-button"
                onClick={() => setConfirmVisible(false)}
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      )}

      {addModalVisible && (
        <div
          className="modal-overlay"
          onClick={() => setAddModalVisible(false)}
        >
          <div
            className="modal-content add"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="label-input-group">
              <div className="label-input">
                <div className="title-text-input">Название:</div>
                <Input
                  name="name"
                  value={newGift.name}
                  onChange={(e) =>
                    setNewGift({ ...newGift, name: e.target.value })
                  }
                />
              </div>

              <div className="label-input">
                <div className="title-text-input">Цена:</div>
                <Input
                  name="price"
                  type="number"
                  value={newGift.price}
                  onChange={(e) =>
                    setNewGift({ ...newGift, price: e.target.value })
                  }
                />
              </div>

              <div className="label-input">
                <div className="title-text-input">Описание:</div>
                <Input
                  name="description"
                  value={newGift.description}
                  onChange={(e) =>
                    setNewGift({ ...newGift, description: e.target.value })
                  }
                />
              </div>

              <div className="label-input">
                <div className="title-text-input">Ссылка:</div>
                <Input
                  name="link"
                  value={newGift.link}
                  onChange={(e) =>
                    setNewGift({ ...newGift, link: e.target.value })
                  }
                />
              </div>

              <div className="label-input">
                <div className="title-text-input">Приоритет:</div>
                <Input
                  name="priority"
                  type="number"
                  value={newGift.priority}
                  onChange={(e) =>
                    setNewGift({
                      ...newGift,
                      priority: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="label-input">
                <div className="title-text-input">Дата окончания:</div>
                <Input
                  name="expiration_date"
                  type="date"
                  value={newGift.expiration_date}
                  onChange={(e) =>
                    setNewGift({ ...newGift, expiration_date: e.target.value })
                  }
                />
              </div>
            </div>

            <button className="add-button" onClick={handleAddGift}>
              Добавить
            </button>
          </div>
        </div>
      )}

      <button
        className="fixed-add-button"
        onClick={() => setAddModalVisible(true)}
      >
        <AddImg className="add-icon"/>
      </button>

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
