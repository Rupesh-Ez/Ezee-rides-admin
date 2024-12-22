import React, { useState, useEffect } from 'react';

const ToogleButton = ({ initialState, onToggle }) => {
    let initstate = (initialState === "Active") ? true : false;
    const [isOn, setIsOn] = useState(initialState);

    useEffect(() => {
        setIsOn(initstate);
    }, [initstate]);

    const handleToggle = () => {
        setIsOn(!isOn);
        onToggle(!isOn);
    };

    return (
        <div
            className={`toggle-button ${isOn ? 'toggle-on' : 'toggle-off'}`}
            onClick={handleToggle}
        >
            <div className="toggle-circle" />
        </div>
    );
};

export default ToogleButton;