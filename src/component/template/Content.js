function Content(props) {
  return (
    <main className="flex-shrink-0 bg-light content">
      {props.children}
    </main>
  );
}

export default Content;
