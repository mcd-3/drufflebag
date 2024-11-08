import { BroadcastChannel } from 'broadcast-channel';

function EmulationContent() {
  const bc = new BroadcastChannel("drufflebag_channel");

  return (
    <div className="container">
        <p>hello world!</p>
        <button onClick={() => { bc.postMessage("close_ruffle"); }}>Close me</button>
    </div>
  );
}

export default EmulationContent;
