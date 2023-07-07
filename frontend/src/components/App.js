/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import RegisterOkPopup from "./RegisterOkPopup";
import ErrorPopup from "./ErrorPopup";
import Spinner from "./Spinner";
import usePopupClose from "../hooks/usePopupClose";

function App() {
  //регистрация пользователя

  const navigate = useNavigate();

  const registrationUser = (data) => {
    auth
      .register(data)
      .then(() => {
        registrOkPopupVisible(true);
      })
      .catch((err) => {
        console.log(err);
        ErrorPopupVisible(true);
      });
  };

  //авторизация пользователя

  const [emailUser, setUserData] = useState(null);

  const [loggedIn, setLoggedIn] = useState(null);

  const [currentUser, setUserInfo] = useState(null);

  const authorizationUser = (data) => {
    setUserData(data.email);
    auth
      .autorize(data)
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        navigate("/");
//        setUserInfo(data.user);
        checkToken()
        navBarVisible(false);
      })
      .catch((err) => {
        console.log(err);
        ErrorPopupVisible(true);
      });
  };

  //аутентификация пользователя



  const checkToken = () => {
    auth
      .getContent()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData(res.email);
          setUserInfo(res);
          navigate("/");
         } else {
          setLoggedIn(false);
        }
      })
      .catch(() => {
        setLoggedIn(false);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

// выход из учётной записи

  const handleLogOut = () => {
    auth
      .logOut()
      .then()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        navigate('/signin');
        navBarVisible(false);
        setLoggedIn(false);
      });
  };

  //эффект загрузки
  const [isLoading, setIsLoading] = useState(false);

  //загрузка данных пользователя и карточек

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      /* Promise.all([api.getInfoProfile(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setUserInfo(userInfo);
          setCards(cards);
        }) */
      api.getInitialCards()
        .then((cards) => {
          setCards(cards.reverse())})
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    };
  }, [loggedIn]);

  //лайки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .setLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //удаление карточки
  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  //изменение данных пользователя
  const handleUpdateUser = (dataUser) => {
    setIsLoading(true);
    api
      .setInfoProfile(dataUser)
      .then((data) => {
        setUserInfo(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  //изменение аватара пользователя
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .setNewAvatar(avatar)
      .then((data) => {
        setUserInfo(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //добавление новой карточки
  const handleAddPlaceSubmit = (dataNewPlace) => {
    setIsLoading(true);
    api
      .setNewCard(dataNewPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //логика попапов
  const [isNewCardPopupVisible, setNewCardPopupVisible] = useState(false);
  const [isPhotoCardPopupVisible, setPhotoCardPopupVisible] = useState(false);
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [isAvatarPopupVisible, setAvatarPopupVisible] = useState(false);
  const [isDeleteCardPopupVisible, deleteCardPopupVisible] = useState(false);
  const [isRegistrOkPopupVisible, registrOkPopupVisible] = useState(false);
  const [isErrorPopupVisible, ErrorPopupVisible] = useState(false);
  const [isNavBarVisible, navBarVisible] = useState(false);

  const [selectedCard, setCardPopup] = useState(null);
  const [deletedCard, deletePopup] = useState(null);

  const handleOpenNewPlacePopup = () => {
    setNewCardPopupVisible(true);
    navBarVisible(false);
  };

  const handleOpenEditProfilePopup = () => {
    setProfilePopupVisible(true);
    navBarVisible(false);
  };

  const handleOpenNewAvatarPopup = () => {
    setAvatarPopupVisible(true);
    navBarVisible(false);
  };

  const handleOpenPopupImage = (card) => {
    setPhotoCardPopupVisible(true);
    setCardPopup(card);
    navBarVisible(false);
  };

  const handleOpenPopupDeleteCard = (card) => {
    deleteCardPopupVisible(true);
    deletePopup(card);
    navBarVisible(false);
  };

  const closeRegistrOkPopup = () => {
    closeAllPopups();
    navigate("/signin");
  };

  const handlOpenNav = () => {
    navBarVisible(!isNavBarVisible);
  };

  const closeAllPopups = () => {
    setProfilePopupVisible(false);
    setNewCardPopupVisible(false);
    setAvatarPopupVisible(false);
    setPhotoCardPopupVisible(false);
    deleteCardPopupVisible(false);
    ErrorPopupVisible(false);
    registrOkPopupVisible(false);
  };

  usePopupClose(
    isNewCardPopupVisible ||
      isPhotoCardPopupVisible ||
      isProfilePopupVisible ||
      isAvatarPopupVisible ||
      isDeleteCardPopupVisible ||
      isRegistrOkPopupVisible ||
      isErrorPopupVisible,
    "popup_opened",
    closeAllPopups
  );

  if (loggedIn === null) {
    return (
      <div className="page">
        <Spinner />
        <Footer />
      </div>
    );
  }

  return (
    <div className={`page ${isNavBarVisible ? "page__nav-bar" : ""}`}>
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  <Register regData={(data) => registrationUser(data)} />
                  <RegisterOkPopup
                    isOpen={isRegistrOkPopupVisible}
                    onClose={closeRegistrOkPopup}
                  />
                  <ErrorPopup
                    isOpen={isErrorPopupVisible}
                    onClose={closeAllPopups}
                  />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Login authData={(data) => authorizationUser(data)} />
                  <ErrorPopup
                    isOpen={isErrorPopupVisible}
                    onClose={closeAllPopups}
                  />
                </>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={
                    <>
                      <Main
                        onEditProfile={handleOpenEditProfilePopup}
                        onAddPlace={handleOpenNewPlacePopup}
                        onEditAvatar={handleOpenNewAvatarPopup}
                        onCardClick={handleOpenPopupImage}
                        onLikeClick={handleCardLike}
                        onCardDelete={handleOpenPopupDeleteCard}
                        emailUser={emailUser}
                        isLoading={isLoading}
                        loggedIn={loggedIn}
                        handleLogOut={handleLogOut}
                        handlOpenNav={handlOpenNav}
                        isOpen={isNavBarVisible}
                      />
                      <EditProfilePopup
                        isOpen={isProfilePopupVisible}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}
                      />
                      <EditAvatarPopup
                        isOpen={isAvatarPopupVisible}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoading}
                      />
                      <AddPlacePopup
                        isOpen={isNewCardPopupVisible}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        isLoading={isLoading}
                      />
                      <DeleteCardPopup
                        isOpen={isDeleteCardPopupVisible}
                        onClose={closeAllPopups}
                        card={deletedCard}
                        onDeleteCard={handleCardDelete}
                        isLoading={isLoading}
                      />
                      <ImagePopup
                        isOpen={isPhotoCardPopupVisible}
                        card={selectedCard}
                        onClose={closeAllPopups}
                      />
                    </>
                  }
                />
              }
            />
          </Routes>
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
      <Footer isOpen={isNavBarVisible} />
    </div>
  );
}

export default App;
