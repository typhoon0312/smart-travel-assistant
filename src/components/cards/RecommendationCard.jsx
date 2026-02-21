import React from 'react';

function RecommendationCard({ data }) {
    if (!data) return null;

    return (
        <div className="timeline-item">
            <div className="timeline-branch"></div>
            <div className="item-header">
                <span className="time-label highlight">추천 명소</span>
            </div>

            <div className="card gradient-card no-padding">
                <div className="card-pad">
                    <div className="card-header-icon mb-1">
                        <div className="icon-circle small icon-yellow">
                            <span className="material-symbols-outlined">lightbulb</span>
                        </div>
                        <h3 className="card-title">{data.title}</h3>
                    </div>

                    <p className="text-desc mb-2">{data.description}</p>

                    <div className="recommendation-grid">
                        {data.places.map((place, idx) => (
                            <div key={idx} className="place-item border-medium" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`, '_blank')} style={{ cursor: 'pointer' }}>
                                <div className={`place-image ${idx === 0 ? 'bg-img-donko' : 'bg-img-miya'}`} />
                                <span className="place-name">{place.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="action-button full-width highlight-bg border-top" onClick={() => window.open('https://www.google.com/maps', '_blank')}>
                    <span className="material-symbols-outlined">map</span> 주변 지도 보기
                </button>
            </div>
        </div>
    );
}

export default RecommendationCard;
