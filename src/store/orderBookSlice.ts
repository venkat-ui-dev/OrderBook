import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    price: number;
    count: number;
    amount: number;
}

interface OrderBookState {
    buyOrders: Order[];
    sellOrders: Order[];
}

const initialState: OrderBookState = {
    buyOrders: [],
    sellOrders: [],
};

const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState,
    reducers: {
        updateOrders: (state, action: PayloadAction<{ buyOrders: Order[]; sellOrders: Order[] }>) => {
            action.payload.buyOrders.forEach((newOrder) => {
                const existingIndex = state.buyOrders.findIndex(
                    (order) => order.price === newOrder.price
                );
                if (existingIndex !== -1) {
                    // Replace the existing order
                    state.buyOrders[existingIndex] = newOrder;
                } else if (newOrder.count > 0) {
                    // Add the new order
                    state.buyOrders.unshift(newOrder);
                }
            });

            action.payload.sellOrders.forEach((newOrder) => {
                const existingIndex = state.sellOrders.findIndex(
                    (order) => order.price === newOrder.price
                );
                if (existingIndex !== -1) {
                    // Replace the existing order
                    state.sellOrders[existingIndex] = newOrder;
                } else if (newOrder.count > 0) {
                    // Add the new order
                    state.sellOrders.unshift(newOrder);
                }
            });

            // Limit rows to the latest 50
            state.buyOrders = state.buyOrders.slice(0, 50);
            state.sellOrders = state.sellOrders.slice(0, 50);
        },
    },
});

export const { updateOrders } = orderBookSlice.actions;
export default orderBookSlice.reducer;
