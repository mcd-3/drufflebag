function NoEmulatorContent() {
  return (
    <div>
      <p>Ruffle Not Found</p>
      <p>You can download it here</p>
      <p>You'll need to download the "self hosted" zip file</p>
      <button
        onClick={() => {
          console.log('Hi')
        }}
      >Find on Desktop</button>
    </div>
  );
}

export default NoEmulatorContent;
