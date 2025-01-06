import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import '../styles/OrderBook.scss';

interface Props {
    precision: number;
    zoomLevel: number;
}

const OrderBook: React.FC<Props> = ({ precision, zoomLevel }) => {
    const buyOrders = useSelector((state: RootState) => state.orderBook.buyOrders);
    const sellOrders = useSelector((state: RootState) => state.orderBook.sellOrders);

    const [flashingRows, setFlashingRows] = useState<{ [key: string]: boolean }>({});
    const previousBuyOrders = useRef<typeof buyOrders>([]);
    const previousSellOrders = useRef<typeof sellOrders>([]);

    const maxTotal = Math.max(
        ...buyOrders.map((order) => Number(order.count) * Number(order.amount)),
        ...sellOrders.map((order) => Number(order.count) * Number(order.amount)),
        1
    );

    const rowFontSize = `${14 + zoomLevel}px`;

    useEffect(() => {
        const newFlashingRows: { [key: string]: boolean } = {};

        // Compare current buy orders with previous ones
        buyOrders.forEach((order, index) => {
            const prevOrder = previousBuyOrders.current[index];
            if (
                !prevOrder ||
                prevOrder.price !== order.price ||
                prevOrder.count !== order.count ||
                prevOrder.amount !== order.amount
            ) {
                newFlashingRows[`buy-${index}`] = true;
            }
        });

        // Compare current sell orders with previous ones
        sellOrders.forEach((order, index) => {
            const prevOrder = previousSellOrders.current[index];
            if (
                !prevOrder ||
                prevOrder.price !== order.price ||
                prevOrder.count !== order.count ||
                prevOrder.amount !== order.amount
            ) {
                newFlashingRows[`sell-${index}`] = true;
            }
        });

        setFlashingRows(newFlashingRows);

        const timeout = setTimeout(() => {
            setFlashingRows({});
        }, 500);

        return () => clearTimeout(timeout);
    }, [buyOrders, sellOrders]);

    useEffect(() => {
        previousBuyOrders.current = [...buyOrders];
        previousSellOrders.current = [...sellOrders];
    });

    return (
        <div className="order-book-container">
            <div className="order-book-content">
                {/* Buy Orders */}
                <div className="buy-orders">
                    <div className="table-header" style={{ fontSize: rowFontSize }}>
                        <span>COUNT</span>
                        <span>AMOUNT</span>
                        <span>TOTAL</span>
                        <span>PRICE</span>
                    </div>
                    {buyOrders.map((order, index) => (
                        <div
                            className={`table-row buy-row ${flashingRows[`buy-${index}`] ? 'flash-green' : ''}`}
                            key={`buy-${index}`}
                            style={{ fontSize: rowFontSize }}
                        >
                            <div
                                className="bar"
                                style={{
                                    width: `${((Number(order.count) * Number(order.amount)) / maxTotal) * 100}%`,
                                }}
                            ></div>
                            <span>{typeof order.count === 'number' ? order.count : 'N/A'}</span>
                            <span>
                                {typeof order.amount === 'number'
                                    ? order.amount.toFixed(precision)
                                    : 'N/A'}
                            </span>
                            <span>
                                {typeof order.amount === 'number' && typeof order.count === 'number'
                                    ? (order.count * order.amount).toFixed(precision)
                                    : 'N/A'}
                            </span>
                            <span>
                                {typeof order.price === 'number'
                                    ? order.price.toFixed(precision)
                                    : 'N/A'}
                            </span>

                        </div>
                    ))}
                </div>

                {/* Sell Orders */}
                <div className="sell-orders">
                    <div className="table-header" style={{ fontSize: rowFontSize }}>
                        <span>COUNT</span>
                        <span>AMOUNT</span>
                        <span>TOTAL</span>
                        <span>PRICE</span>
                    </div>
                    {sellOrders.map((order, index) => (
                        <div
                            className={`table-row sell-row ${flashingRows[`sell-${index}`] ? 'flash-red' : ''}`}
                            key={`sell-${index}`}
                            style={{ fontSize: rowFontSize }}
                        >
                            <div
                                className="bar"
                                style={{
                                    width: `${((Number(order.count) * Number(order.amount)) / maxTotal) * 100}%`,
                                }}
                            ></div>
                            <span>{typeof order.count === 'number' ? order.count : 'N/A'}</span>
                            <span>
                                {typeof order.amount === 'number'
                                    ? order.amount.toFixed(precision)
                                    : 'N/A'}
                            </span>
                            <span>
                                {typeof order.amount === 'number' && typeof order.count === 'number'
                                    ? (order.count * order.amount).toFixed(precision)
                                    : 'N/A'}
                            </span>
                            <span>
                                {typeof order.price === 'number'
                                    ? order.price.toFixed(precision)
                                    : 'N/A'}
                            </span>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(OrderBook);
