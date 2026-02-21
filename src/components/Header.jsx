import React, { useState, useEffect } from 'react';

function Header({ onOpenSettings }) {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const options = { month: 'long', day: 'numeric', weekday: 'long' };
        setCurrentDate(today.toLocaleDateString('ko-KR', options));
    }, []);

    return (
        <header className="header block-blur">
            <div className="header-top">
                <div className="header-info">
                    <p className="date-badge">{currentDate}</p>
                    <h1 className="page-title">여행 준비 중</h1>
                </div>
                <div className="header-actions">
                    <div className="weather-info">
                        <span className="material-symbols-outlined">partly_cloudy_day</span>
                        <span>18°C</span>
                    </div>
                    <button className="icon-button group" onClick={onOpenSettings} title="환경설정">
                        <span className="material-symbols-outlined icon-primary group-hover">settings</span>
                    </button>
                    <button className="icon-button group" title="일정 편집">
                        <span className="material-symbols-outlined icon-primary group-hover">edit_calendar</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
