/**
 * 
 * @param {*} param0 
 * @returns 
 */
const IconButton = ({
  text,
  src,
  onClick = () => {},
}) => {
  return (
    <div>
      <img src={src}/>
      <p>{text}</p>
    </div>
  )
};

export default IconButton;