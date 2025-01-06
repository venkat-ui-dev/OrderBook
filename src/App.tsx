import { useEffect, useState } from 'react';
import Header from './components/Header';
import OrderBook from './components/OrderBook';
import createWebSocket from './utils/websocket';
import { updateOrders } from './store/orderBookSlice';
import { useDispatch } from 'react-redux';

const App = () => {
  const [precision, setPrecision] = useState(2);
  const [zoomLevel, setZoomLevel] = useState(1);
  const dispatch = useDispatch();

  const increasePrecision = () => setPrecision((prev) => Math.min(prev + 1, 8));
  const decreasePrecision = () => setPrecision((prev) => Math.max(prev - 1, 0));
  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 5));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    const socket = createWebSocket((data) => {
      if (Array.isArray(data) && data.length > 2) {
        const [price, count, amount] = data;

        const validOrder =
          !isNaN(Number(price)) &&
          !isNaN(Number(count)) &&
          !isNaN(Number(amount));

        if (validOrder) {
          const order = {
            price: Number(price),
            count: Number(count),
            amount: Number(amount),
          };

          const orders = {
            buyOrders: order.amount > 0 ? [order] : [],
            sellOrders: order.amount < 0 ? [order] : [],
          };

          dispatch(updateOrders(orders));
        }
      }
    });

    return () => socket.close();
  }, [dispatch]);


  return (
    <div>
      <Header
        increasePrecision={increasePrecision}
        decreasePrecision={decreasePrecision}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
      <OrderBook precision={precision} zoomLevel={zoomLevel} />
    </div>
  );
};

export default App;
