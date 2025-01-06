# OrderBook Application

A real-time **Order Book** application for visualizing buy and sell orders in a cryptocurrency market. The application connects to the Bitfinex WebSocket API, processes incoming data, and displays a dynamic, visually appealing order book with animations.

---

## Features

- **Real-Time Data**: Fetches real-time buy/sell orders from the Bitfinex WebSocket API.
- **Dynamic Visualization**: Animates updates to the order book with color indicators.
- **Precision and Zoom Controls**: Customize the precision of displayed numbers and zoom levels for better readability.
- **Bar Visualization**: Displays proportional bars for each order based on its size.
- **Responsive Design**: Works seamlessly across different screen sizes.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

### Clone the Repository

```bash
$ git clone https://github.com/venkat-ui-dev/OrderBook.git
$ cd OrderBook
```

### Install Dependencies

```bash
# Using npm
$ npm install

# OR using yarn
$ yarn install
```

### Run the Application

```bash
$ npm start
# OR
$ yarn start
```

This will start the development server at `http://localhost:3000/`.

---

## Project Structure

```plaintext
OrderBook/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Header with precision and zoom controls
│   │   ├── OrderBook.tsx       # Order book visualization
│   ├── store/
│   │   ├── orderBookSlice.ts   # Redux slice for managing order book state
│   │   ├── store.ts            # Redux store configuration
│   ├── utils/
│   │   ├── websocket.ts        # WebSocket utility for connecting to Bitfinex
│   ├── styles/
│   │   ├── OrderBook.scss      # Styling for the order book
│   ├── App.tsx                 # Main application entry point
│   ├── index.tsx               # React entry point
├── public/
├── package.json
├── README.md                   # Project documentation
```

---

## WebSocket API

The application uses the [Bitfinex WebSocket API](https://docs.bitfinex.com/docs/ws-general) to fetch live market data.

### Subscribed Channel

- **Channel**: `book`
- **Symbol**: `tBTCUSD`

---

## Controls

| **Control**            | **Description**                                             |
| ---------------------- | ----------------------------------------------------------- |
| **Increase Precision** | Increases the decimal precision of displayed data.          |
| **Decrease Precision** | Decreases the decimal precision of displayed data.          |
| **Zoom In**            | Increases the font size and bar size for better visibility. |
| **Zoom Out**           | Decreases the font size and bar size.                       |

---

## Animations

- **Flash Animation**: Updated rows flash green (buy orders) or red (sell orders) for 0.5 seconds to indicate changes.

---

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Strongly typed JavaScript
- **Redux Toolkit**: State management
- **SCSS**: Styling
- **WebSocket**: Real-time data streaming

---

## Deployment

To build the application for production:

```bash
$ npm run build
# OR
$ yarn build
```

---

## Contact

For any queries or support, reach out at [techvenkats@gmail.com](mailto:techvenkats@gmail.com).

---
