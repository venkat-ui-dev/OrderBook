import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from './orderBookSlice';

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('orderBook');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Couldn't load state from LocalStorage", e);
        return undefined;
    }
};

const preloadedState = loadFromLocalStorage();

const store = configureStore({
    reducer: {
        orderBook: orderBookReducer,
    },
    preloadedState: {
        orderBook: preloadedState || { buyOrders: [], sellOrders: [] },
    },
});

const saveToLocalStorage = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('orderBook', serializedState);
    } catch (e) {
        console.error("Couldn't save state to LocalStorage", e);
    }
};

store.subscribe(() => {
    saveToLocalStorage(store.getState().orderBook);
});


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
