import React, { useState } from 'react';
import axios from 'axios';

function RestroomCard() {
    const [restrooms, setRestrooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationStatus, setLocationStatus] = useState('');

    const findRestrooms = () => {
        setLoading(true);
        setLocationStatus('위치 확인 중...');

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setLocationStatus('주변 화장실 검색 중...');

                    // Google Places API (Text Search for Convenience - Client Side)
                    // Note: In a real prod app, use Maps JS API or backend. Using a direct Places search link here.
                    const query = encodeURIComponent("공용 화장실");
                    const mapUrl = `https://www.google.com/maps/search/${query}/@${lat},${lng},15z`;

                    // 모의 데이터 (실제로는 위 좌표를 기반으로 검색 결과가 나옴)
                    setRestrooms([
                        { name: '도쿄 메트로 시부야역 화장실', distance: '150m', type: '무료, 장애인 화장실 있음', link: mapUrl },
                        { name: '시부야 마크시티 공용 화장실', distance: '300m', type: '무료, 깨끗함', link: mapUrl },
                    ]);
                    setLocationStatus('');
                    setLoading(false);
                },
                (error) => {
                    console.error("위치 에러:", error);
                    setLocationStatus('위치를 확인할 수 없습니다. 브라우저 권한을 확인해주세요.');
                    setLoading(false);
                }
            );
        } else {
            setLocationStatus('이 브라우저에서는 위치 정보가 지원되지 않습니다.');
            setLoading(false);
        }
    };

    return (
        <div className="card timeline-card border-medium">
            <div className="card-header pb-2" style={{ borderBottom: '1px solid #333' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined text-primary">wc</span>
                    <h3 className="card-title">주변 공용 화장실 찾기</h3>
                </div>
                <button className="icon-button" style={{ background: 'var(--primary)', color: '#fff', borderRadius: '50%', padding: '8px' }} onClick={findRestrooms} disabled={loading}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>my_location</span>
                </button>
            </div>

            <div className="padding-md pt-2">
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>
                    현재 내 위치와 가장 가까운 화장실을 안내해 드립니다.
                </p>

                {locationStatus && <p style={{ fontSize: '12px', color: 'var(--primary-light)', fontStyle: 'italic', marginBottom: '8px' }}>{locationStatus}</p>}

                {restrooms.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                        {restrooms.map((restroom, idx) => (
                            <a key={idx} href={restroom.link} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#1a1a1a', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '14px', marginBottom: '4px' }}>{restroom.name}</h4>
                                    <span style={{ fontSize: '11px', color: '#888' }}>{restroom.distance} • {restroom.type}</span>
                                </div>
                                <span className="material-symbols-outlined text-gray" style={{ fontSize: '16px' }}>open_in_new</span>
                            </a>
                        ))}
                    </div>
                )}

                <div className="info-box flex-start" style={{ background: 'rgba(255,165,0,0.1)', border: '1px solid rgba(255,165,0,0.3)', borderRadius: '8px', padding: '12px' }}>
                    <span className="material-symbols-outlined mr-2" style={{ color: 'orange', fontSize: '20px' }}>info</span>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '12px', color: 'orange', marginBottom: '4px' }}>해외 화장실 이용 TIP</h4>
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#ccc', lineHeight: '1.4' }}>
                            <li>일본: 거의 모든 공중 화장실 무료, 편의점 화장실도 직원에게 말하고 사용 가능.</li>
                            <li>유럽 등: 유료 화장실(동전 필요)이 많습니다. 영수증에 화장실 비밀번호가 적혀있기도 합니다.</li>
                            <li>사용 후 휴지는 한국과 달리 <strong>변기에 버리는 국가가 많습니다.</strong> (막히지 않는 재질 사용)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestroomCard;
