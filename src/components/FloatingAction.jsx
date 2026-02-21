import React from 'react';

function FloatingAction() {
    const openMaps = () => {
        window.open('https://www.google.com/maps/search/?api=1&query=Meiji+Shrine+Tokyo', '_blank');
    };

    return (
        <div className="floating-action-container">
            <button className="floating-nav-card shadow-glow hover-scale" onClick={openMaps}>
                <div className="next-img-circle">
                    <div className="bg-img-donko img-full" />
                    <div className="overlay-dark border-circle flex-center">
                        <span className="material-symbols-outlined text-shadow">near_me</span>
                    </div>
                </div>
                <div className="next-text">
                    <span className="next-label">다음 장소</span>
                    <span className="next-title">경로 보기</span>
                </div>
                <span className="material-symbols-outlined arrow-right">chevron_right</span>
            </button>
        </div>
    );
}

export default FloatingAction;
