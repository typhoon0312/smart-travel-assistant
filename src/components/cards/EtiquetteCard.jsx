import React from 'react';

function EtiquetteCard({ data }) {
    if (!data) return null;

    return (
        <div className="timeline-item">
            <div className="timeline-branch"></div>
            <div className="item-header">
                <span className="time-label highlight-purple">에티켓 가이드</span>
            </div>

            <div className="card gradient-purple no-padding border-medium">
                <div className="card-pad">
                    <div className="card-header-icon mb-1">
                        <div className="icon-circle small icon-purple">
                            <span className="material-symbols-outlined">temple_buddhist</span>
                        </div>
                        <h3 className="card-title">{data.title}</h3>
                    </div>

                    <div className="content-row">
                        <div className="text-content">
                            <p className="text-desc mb-2 mt-0">{data.mainDesc}</p>
                            <div className="tag-row">
                                {data.tags.map((tag, idx) => (
                                    <span key={idx} className="tag-item">
                                        <span className="material-symbols-outlined">check</span> {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="image-box bg-img-shrine" />
                    </div>
                </div>
                <button className="action-button full-width dark-bg border-top text-gray hover-light">
                    전체 가이드 읽기 <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}

export default EtiquetteCard;
