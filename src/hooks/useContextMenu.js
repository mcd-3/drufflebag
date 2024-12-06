import { useState, useCallback, useEffect } from 'react';

const useContextMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const showMenu = useCallback((event, items) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
    setMenuItems(items);
    setMenuVisible(true);
  }, []);

  const hideMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      hideMenu();
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [hideMenu]);

  return { menuVisible, menuItems, menuPosition, showMenu, hideMenu };
};


export { useContextMenu };
