import { contextMenu } from "./../styles";

const ContextMenu = ({ items, position }) => {
  return (
    <div
        className={contextMenu.container}
        style={{
          top: `${position.y - 2}px`,
          left: `${position.x + 4}px`,
          bottom: 'auto',
        }}
    >
      {items.map((item, index) => (
        <div>
          <div
            className={contextMenu.menuItem}
            key={index}
            onClick={item.action}
          >
            {item.label}
          </div>
          { index !== items.length &&
            <div className={contextMenu.divider}></div>
          }
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
