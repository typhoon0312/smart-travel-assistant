import React, { useState } from 'react';
import MiniMap from '../MiniMap';

function TransitCard({ apiKey }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="timeline-item">
            <div className="timeline-branch"></div>
            <div className="item-header">
                <span className="time-label">오전 10:45</span>
            </div>

            <div className="card timeline-card border-orange">
                <div className="card-header" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
                    <div>
                        <h3 className="card-title">시부야행 지하철</h3>
                        <p className="card-subtitle">긴자선 • 2번 승강장</p>
                    </div>
                    <div className="header-status">
                        <span className="status-badge alert">2분 지연</span>
                    </div>
                </div>

                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-fill highlight-bg" style={{ width: '60%' }}></div>
                        <div className="progress-node active" style={{ left: '0' }}>
                            <div className="node-label">메이지 신궁</div>
                        </div>
                        <div className="progress-node pulse" style={{ left: '60%' }}></div>
                        <div className="progress-node" style={{ left: '100%' }}>
                            <div className="node-label">시부야</div>
                        </div>
                    </div>
                    <span className="stop-count">4개 정류장</span>
                </div>

                {expanded && apiKey ? (
                    <div className="border-top" style={{ borderColor: 'var(--border-light)' }}>
                        <MiniMap apiKey={apiKey} />
                    </div>
                ) : expanded ? (
                    <div className="padding-md flex-center" style={{ color: '#888' }}>
                        지도 기능은 API Key 입력 후 활성화됩니다.
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default TransitCard;
