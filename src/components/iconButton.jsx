import { iconButton } from './../styles';

/**
 * Button that has an icon on top and a string below
 *
 * @param {string} text - Text to display below the button
 * @param {string} src - Src path of the image icon to display
 * @param {string|object} className - CSS Module className for styles
 * @param {string} title - Tooltip text to display when hovered
 * @param {callback} onClick 
 * @returns 
 */
const IconButton = ({
  text,
  src,
  className,
  title = "",
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <div className={className} title={title}>
      <button
        onClick={() => onClick()}
        className={iconButton.button}
        disabled={disabled}
      >
        <img className={iconButton.icon} src={src}/>
        <p className={iconButton.text}>{text}</p>
      </button>
    </div>
  )
};

export default IconButton;