import styles from "./../styles/components/contextMenu.module.css";

const ContextMenu = ({ items, position }) => {
  return (
    <div
        className={styles['context-menu']}
        style={ { top: `${position.y - 2}px`, left: `${position.x + 4}px`, bottom: 'auto' } }
    >
      {items.map((item, index) => (
        <div>
          <div className={styles['menu-item']} key={index} onClick={item.action}>
            {item.label}
          </div>
          { index !== items.length && <div className={styles.divider}></div>  }
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
