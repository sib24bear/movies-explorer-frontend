import './PageNotFound.css'; 

function NotFound({ history }) {
  
  function goBackHandler() {
    history.goBack();
  }

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button onClick={goBackHandler} className="not-found__button">Назад</button>
    </section>
  );
}

export default NotFound;
