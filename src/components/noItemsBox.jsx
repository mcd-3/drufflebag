import { getAsset } from './../utils/assets.js';
import { noItemsBox } from './../styles';

const NoItemsBox = ({
  topText = "",
  bottomText = "",
  extraText = "",
  icon = getAsset('ICN_FILE_NOT_FOUND'),
}) => {
  return (
    <div className={noItemsBox.container}>
      <div className={noItemsBox.centered}>
        <div>
          <h2 className={`${noItemsBox.row} ${noItemsBox.header}`}>{topText}</h2>
          <img
            className={`${noItemsBox.row} ${noItemsBox.icon}`}
            width={100}
            height={100}
            src={icon}
          />
          <p className={`${noItemsBox.row} ${noItemsBox.subtext}`}>{bottomText}</p>
          <br />
          <p className={`${noItemsBox.row} ${noItemsBox.extra}`}>{extraText}</p>
        </div>
      </div>
    </div>
  );
};

export default NoItemsBox;
