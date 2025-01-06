import React from 'react';
import {
    FaMinus,
    FaPlus,
    FaBell,
    FaCog,
    FaSearchPlus,
    FaSearch,
} from 'react-icons/fa';

interface Props {
    increasePrecision: () => void;
    decreasePrecision: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
}

const Header: React.FC<Props> = ({
    increasePrecision,
    decreasePrecision,
    zoomIn,
    zoomOut,
}) => {
    return (
        <div style={styles.headerContainer}>
            <div style={styles.titleSection}>
                <span>&#9662;</span> <strong>ORDER BOOK BTC/USD</strong>
            </div>

            <div style={styles.iconSection}>
                <FaPlus
                    title="Increase Precision"
                    style={styles.icon}
                    onClick={increasePrecision}
                />
                <FaMinus
                    title="Decrease Precision"
                    style={styles.icon}
                    onClick={decreasePrecision}
                />
                <FaSearch
                    title="Zoom Out"
                    style={styles.icon}
                    onClick={zoomOut}
                />
                <FaSearchPlus
                    title="Zoom In"
                    style={styles.icon}
                    onClick={zoomIn}
                />
                <FaBell
                    title="Notifications"
                    style={styles.icon}
                    onClick={() => alert('Notification Settings')}
                />
                <FaCog
                    title="Settings"
                    style={styles.icon}
                    onClick={() => alert('Open Settings')}
                />
            </div>
        </div>
    );
};

const styles = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: '10px 20px',
        color: '#ccc',
        borderBottom: '1px solid #333',
    },
    titleSection: {
        fontSize: '16px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    },
    iconSection: {
        display: 'flex',
        gap: '15px',
    },
    icon: {
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'color 0.3s',
        color: '#ccc',

        '&:hover': {
            color: '#fff',
        },
    },
};

export default Header;
