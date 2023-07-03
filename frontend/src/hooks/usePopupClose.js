import { useEffect } from "react";

function usePopupClose(isOpen, styleOpenPopup, closeAllPopups) {

  useEffect(() => {

    if (!isOpen) return;

    const closeOverlay = (e) => {
      e.stopPropagation();
      if (e.target.classList.contains(styleOpenPopup)) {
        closeAllPopups();
      };
    };

    const closeEsc = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      };
    };

    document.addEventListener("keydown", closeEsc);
    document.addEventListener("mousedown", closeOverlay);

    return () => {
      document.removeEventListener("keydown", closeEsc);
      document.removeEventListener("mousedown", closeOverlay);
    };
  }, [isOpen, styleOpenPopup, closeAllPopups]);
}

export default usePopupClose;
