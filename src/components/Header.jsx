import React from 'react';

function Header({ onOpenSettings }) {
    return (
        <header className="header block-blur">
            <div className="header-top">
                <div className="header-info">
                    <p className="date-badge">10월 24일 수요일</p>
                    <h1 className="page-title">3일차 • 도쿄</h1>
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
