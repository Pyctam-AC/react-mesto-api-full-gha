import React from "react";

function Card({
  card,
  onCardClick,
  onLikeClick,
  onCardDelete,
  currentUser})
  {


  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const handleClick = () => { onCardClick(card) };
  const hadleLike = () => {onLikeClick(card)};
  const handleDeleteClick = () => {onCardDelete(card)};

  return (
    <li className="place__item" key={card._id}>
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить карточку"
          className="place__trash"
          onClick={handleDeleteClick}
        />
      )}
      <img
        type="button"
        src={card.link}
        className="place__img"
        alt={card.name}
        onClick={handleClick}
      />
      <div className="place__text">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__container-like">
          <button
            onClick={hadleLike}
            type="button"
            className={`like-button
              ${isLiked ? "like-button_active" : ""}`}
            aria-label="Лайк"
          ></button>
          <p className="place__like">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
