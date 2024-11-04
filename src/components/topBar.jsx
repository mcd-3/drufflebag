import IconButton from './iconButton';
import styles from './../styles/components/topBar.module.css';

/**
 * Bar that display a list of controls and options
 *
 * @returns {}
 */
const TopBar = () => {
  // TODO: Move this function
  const getAssetPath = assetFileName => {
    return `src/assets/${assetFileName}`;
  };

  return (
    <div className={styles["topBar-root"]}>
      <div className={styles["topBar-file-column"]}>
        <IconButton className={styles["topBar-open-button"]} text="open" src={getAssetPath('folder-demo.svg')} onClick={ () => { console.error('asd'); } }/>
        <IconButton className={styles["topBar-refresh-button"]} text="refresh" src={getAssetPath('folder-demo.svg')} onClick={ () => { console.error('sdf'); } }/>
        <IconButton className={styles["topBar-settings-button"]} text="settings" src={getAssetPath('folder-demo.svg')} onClick={ () => { console.error('dfg'); } }/>
      </div>
      <div className={styles["topBar-vertical-divider"]}></div>
      <div className={styles["topBar-control-column"]}>
        <IconButton className={styles["topBar-pause-button"]} text="pause" src={getAssetPath('folder-demo.svg')} />
        <IconButton className={styles["topBar-stop-button"]} text="stop" src={getAssetPath('folder-demo.svg')}/>
      </div>
      <div className={styles["topBar-vertical-divider"]}></div>
      <div className={styles["topBar-spoof-column"]}>
        <p>[c] (_) [Spoof Url...                        ]</p>
      </div>
    </div>
  );
}

export default TopBar;