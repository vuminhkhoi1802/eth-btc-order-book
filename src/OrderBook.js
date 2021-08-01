import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { CURRENCY_PAIR, BIT_STAMP_WS_URL } from './config';

const OrderBook = () => {
  const [orders, setOrders] = useState([]);
  const currencyPair = CURRENCY_PAIR;

  const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);


  useEffect(() => {
    const subscribe = {
      event: "bts:subscribe",
      data: {
        channel: `order_book_${currencyPair}`
      }
    };

    const ws = new WebSocket(BIT_STAMP_WS_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setOrders(response.data);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [currencyPair]);

  const { bids, asks } = orders;

  const arraysOfTotal = (arr) => {
    let mainArr = [];
    arr && arr.map((item, index) => {
      return mainArr.push(parseFloat(item[0]) * parseFloat(item[1]));
    });
    return mainArr;
  }

  const sumofElementsInArray = (arr) => {
    return _.sum(arr);
  }

  const orderRows = (arr) =>
    arr &&
    arr.map((item, index) => (
      <tr key={index}>
        <td> {item[1]} </td>
        <td> {item[0]} </td>
        <td> {parseFloat(item[1]) * parseFloat(item[0])}</td>
      </tr>
    ));

  const orderHead = (title) => (
    <thead>
      <tr>
        <th colSpan="3">{title}</th>
      </tr>
      <tr>
        <th>Size ({currencyArray[0]})</th>
        <th>Price ({currencyArray[1]})</th>
        <th>Total in ({currencyArray[1]})</th>
      </tr>
    </thead>
  );

  return (
    <div className="order-container">
      <table>
        {orderHead("Bids")}
        <tbody>{orderRows(bids)}</tbody>
        <tbody>
          <tr>
            <th></th>
            <th>TOTAL</th>
            <th>{sumofElementsInArray(arraysOfTotal(bids))}</th>
          </tr>
        </tbody>
      </table>

      <table>
        {orderHead("Asks")}
        <tbody>{orderRows(asks)}</tbody>
        <tbody>
          <tr>
            <th></th>
            <th>TOTAL</th>
            <th>{sumofElementsInArray(arraysOfTotal(asks))}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderBook;
