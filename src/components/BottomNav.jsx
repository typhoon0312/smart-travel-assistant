import React from 'react';

function BottomNav({ activeTab, onChangeTab }) {
    return (
        <nav className="bottom-nav block-blur">
            <button className={`nav-item ${activeTab === 'itinerary' ? 'active' : ''}`} onClick={() => onChangeTab('itinerary')} style={{ background: 'transparent', border: 'none' }}>
                <span className={`material-symbols-outlined ${activeTab === 'itinerary' ? 'filled' : ''}`}>map</span>
                <span>일정</span>
            </button>
            <button className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`} onClick={() => onChangeTab('explore')} style={{ background: 'transparent', border: 'none' }}>
                <span className={`material-symbols-outlined ${activeTab === 'explore' ? 'filled' : ''}`}>explore</span>
                <span>탐색</span>
            </button>
            <button className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => onChangeTab('saved')} style={{ background: 'transparent', border: 'none' }}>
                <span className={`material-symbols-outlined ${activeTab === 'saved' ? 'filled' : ''}`}>favorite</span>
                <span>저장됨</span>
            </button>
            <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => onChangeTab('profile')} style={{ background: 'transparent', border: 'none' }}>
                <span className={`material-symbols-outlined ${activeTab === 'profile' ? 'filled' : ''}`}>person</span>
                <span>프로필</span>
            </button>
        </nav>
    );
}

export default BottomNav;
