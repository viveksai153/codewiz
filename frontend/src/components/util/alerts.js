import React, { useEffect, useState } from 'react';
import './alerts.css';

const Alert = ({ type, message, duration = 3000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [type, message, duration]);

    if (!visible) return null;

    return (
        <div role="alert" aria-live="assertive" className={`alert alert-${type} ${visible ? 'show' : 'hide'}`}>
            {message}
        </div>
    );
};

export default Alert;
