import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shoppingbagChangeProduct } from '../actions/shoppingbagProductActions';
import { sendOrderRequest, sendOrderInit } from '../actions/sendOrderActions';
import { clearShoppingbag } from '../storage/shoppingbag-storage';

export default function SendOrder() {
  const { products } = useSelector((state) => state.shoppingbag);
  const { response, loading, error } = useSelector((state) => state.sendOrder);
  const [changeField, setChangeField] = useState({ phone: '', address: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendOrderInit());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response === 204) {
      dispatch(shoppingbagChangeProduct(clearShoppingbag()));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const send = () => {
    dispatch(sendOrderRequest({
      owner: {
        phone: changeField.phone,
        address: changeField.address,
      },
      items: products.map((item) => ({
        id: item.id,
        price: item.price,
        count: item.amount,
      })),
    }));
  };

  const handleChangeField = (event) => {
    const { id, value } = event.target;
    setChangeField((prevChangeField) => ({ ...prevChangeField, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    send();
  };

  const handleRepeat = () => {
    send();
  };

  if (response === 204) {
    return (<div className="order-success">Ваш заказ успешно оформлен.</div>);
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      {loading && <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>}

      {error && <div className="error-msg">
        <p>Ошибка соединения</p>
        <div onClick={handleRepeat}>Повторить запрос</div>
      </div>}

      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" id="phone" placeholder="Ваш телефон" value={changeField.phone} onChange={handleChangeField} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input className="form-control" id="address" placeholder="Адрес доставки" value={changeField.address} onChange={handleChangeField} required/>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="agreement" required/>
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" className="btn btn-outline-secondary" disabled={loading || !products.length}>Оформить</button>
        </form>
      </div>
    </section>
  );
}