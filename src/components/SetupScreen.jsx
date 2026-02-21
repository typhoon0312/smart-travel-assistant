import React, { useState, useEffect } from 'react';

function SetupScreen({ onComplete, isEditing = false }) {
    const [keys, setKeys] = useState({
        gemini: localStorage.getItem('GEMINI_API_KEY') || '',
        googleMaps: localStorage.getItem('GOOGLE_MAPS_API_KEY') || '',
        googleTranslate: localStorage.getItem('GOOGLE_TRANSLATE_API_KEY') || '',
        googleClientId: localStorage.getItem('GOOGLE_CLIENT_ID') || '',
    });

    const [profile, setProfile] = useState({
        name: localStorage.getItem('USER_NAME') || '',
        favoriteStyle: localStorage.getItem('TRAVEL_STYLE') || '현지인처럼',
    });

    const [step, setStep] = useState(1);

    useEffect(() => {
        if (!isEditing) {
            const savedGemini = localStorage.getItem('GEMINI_API_KEY');
            const savedName = localStorage.getItem('USER_NAME');

            // 필수 키만 체크해서 넘어가도록 완화 (선택적 기능 지원)
            if (savedGemini && savedName) {
                onComplete();
            }
        }
    }, [isEditing, onComplete]);

    const handleSave = () => {
        if (!keys.gemini || !profile.name) {
            alert('Gemini API 키와 이름은 필수입니다.');
            return;
        }

        // 로컬 스토리지에 사용자 고유 키 저장
        localStorage.setItem('GEMINI_API_KEY', keys.gemini);
        localStorage.setItem('USER_NAME', profile.name);
        localStorage.setItem('TRAVEL_STYLE', profile.favoriteStyle);

        if (keys.googleMaps) localStorage.setItem('GOOGLE_MAPS_API_KEY', keys.googleMaps);
        if (keys.googleTranslate) localStorage.setItem('GOOGLE_TRANSLATE_API_KEY', keys.googleTranslate);
        if (keys.googleClientId) localStorage.setItem('GOOGLE_CLIENT_ID', keys.googleClientId);

        onComplete();
    };

    return (
        <div className="app-container" style={{ padding: '32px 24px', justifyContent: 'flex-start', overflowY: 'auto' }}>
            <div className="card timeline-card padding-md" style={{ border: '1px solid var(--border-light)', marginTop: '24px' }}>

                {step === 1 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>{isEditing ? '환경 설정 ✨' : '환영합니다 ✨'}</h2>
                        <p className="text-desc" style={{ marginBottom: '24px' }}>오픈소스 스마트 여행 앱 초기 설정입니다.<br />아래 API 키들은 기기 내부에만 안전하게 저장됩니다.</p>

                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Gemini API Key (필수)</label>
                                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary-light)', textDecoration: 'none' }}>발급 ↗</a>
                            </div>
                            <input
                                type="password"
                                value={keys.gemini}
                                onChange={e => setKeys({ ...keys, gemini: e.target.value })}
                                placeholder="AIzaSy..."
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff' }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Google Maps API Key (선택)</label>
                                <a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary-light)', textDecoration: 'none' }}>발급 ↗</a>
                            </div>
                            <input
                                type="password"
                                value={keys.googleMaps}
                                onChange={e => setKeys({ ...keys, googleMaps: e.target.value })}
                                placeholder="경로/지도 시각화용"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff' }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Google Translate API (선택)</label>
                                <a href="https://console.cloud.google.com/apis/library/translate.googleapis.com" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary-light)', textDecoration: 'none' }}>발급 ↗</a>
                            </div>
                            <input
                                type="password"
                                value={keys.googleTranslate}
                                onChange={e => setKeys({ ...keys, googleTranslate: e.target.value })}
                                placeholder="메뉴판/실시간 통역용"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff' }}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Google OAuth Client ID (선택)</label>
                                <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary-light)', textDecoration: 'none' }}>발급 ↗</a>
                            </div>
                            <input
                                type="text"
                                value={keys.googleClientId}
                                onChange={e => setKeys({ ...keys, googleClientId: e.target.value })}
                                placeholder="구글 캘린더 동기화용"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff', marginBottom: '8px' }}
                            />
                            <div style={{ background: 'rgba(255, 152, 0, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 152, 0, 0.3)' }}>
                                <p style={{ fontSize: '12px', color: '#ffb74d', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>info</span>
                                    구글 콘솔 설정 안내 (리디렉트 오류 방지)
                                </p>
                                <ul style={{ fontSize: '11px', color: '#aaa', paddingLeft: '16px', margin: 0, lineHeight: 1.5 }}>
                                    <li>승인된 자바스크립트 원본: <code>http://localhost:5173</code> 추가</li>
                                    <li>승인된 리디렉션 URI: <code>http://localhost:5173</code> 추가</li>
                                    <li>(슬래시 기호 <code>/</code> 끝에 붙이지 마세요!)</li>
                                </ul>
                            </div>
                        </div>

                        <button
                            className="action-button full-width primary-bg pulse"
                            onClick={() => setStep(2)}
                            disabled={!keys.gemini}
                        >
                            다음 단계로 <span className="material-symbols-outlined">arrow_forward</span>
                        </button>

                        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #333', textAlign: 'center' }}>
                            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>맥미니 등 개인 PC를 서버로 만들고 스마트폰으로 접속하고 싶으신가요?</p>
                            <button className="action-button outline-button text-primary" onClick={() => setStep('guide')} style={{ border: '1px solid var(--primary)', padding: '8px 16px', fontSize: '13px' }}>
                                📖 초보자용 외부 접속 서버 구축 가이드
                            </button>
                        </div>
                    </div>
                )}

                {step === 'guide' && (
                    <div className="fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '20px', margin: 0 }}>🚀 나만의 개인 서버 구축하기</h2>
                            <button className="icon-button padding-0" onClick={() => setStep(1)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <p className="text-desc" style={{ marginBottom: '24px', fontSize: '14px', lineHeight: 1.5 }}>
                            집에 있는 맥미니나 구형 PC를 서버로 활용하면, 여행 중 스마트폰 배터리 소모 없이 매우 빠르고 안전하게 이 스마트 비서를 활용할 수 있습니다. (API 키도 내 스마트폰에만 저장됩니다!)
                        </p>

                        <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#222', borderRadius: '12px', border: '1px solid #333' }}>
                            <h3 style={{ fontSize: '16px', color: 'var(--primary-light)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>computer</span>
                                1. 서버용 PC에서 앱 실행하기
                            </h3>
                            <p style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.5, margin: 0 }}>
                                항상 켜져 있을 맥미니(또는 데스크탑)에서 터미널을 열고, 이 앱이 있는 폴더에서 아래 명령어를 실행하여 서버를 켭니다.<br />
                                <code style={{ backgroundColor: '#000', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '8px', color: '#fff' }}>npm run dev</code>
                                <br /><span style={{ fontSize: '11px', color: '#888' }}>(기본적으로 http://localhost:5173 주소로 실행됩니다.)</span>
                            </p>
                        </div>

                        <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#222', borderRadius: '12px', border: '1px solid #333' }}>
                            <h3 style={{ fontSize: '16px', color: '#ffeb3b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>public</span>
                                2. 외부 접속용 터널 뚫기 (Cloudflare 무료)
                            </h3>
                            <p style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.5, margin: 0 }}>
                                공유기 설정(포트포워딩) 없이 가장 쉽게 밖에서 접속하는 방법입니다. 서버 PC에서 새 터미널 창을 열고 아래 명령어를 입력하세요.<br />
                                <code style={{ backgroundColor: '#000', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '8px', color: '#fff', wordBreak: 'break-all' }}>npx localtunnel --port 5173</code>
                                <br /><span style={{ fontSize: '11px', color: '#888', marginTop: '4px', display: 'block' }}>* 또는 더 안정적인 <b>Cloudflare Tunnel</b> 사용: <code>npm install -g cloudflared</code> 후 <code>cloudflared tunnel --url http://localhost:5173</code> 입력</span>
                            </p>
                            <p style={{ fontSize: '13px', color: '#ffb74d', marginTop: '12px', padding: '8px', backgroundColor: 'rgba(255, 152, 0, 0.1)', borderRadius: '6px' }}>
                                💡 터미널 화면에 생성된 랜덤 주소(예: <code>https://xxxxx.trycloudflare.com</code>)를 복사해 두세요! 이것이 나만의 전용 접속 링크입니다.
                            </p>
                        </div>

                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#222', borderRadius: '12px', border: '1px solid #333' }}>
                            <h3 style={{ fontSize: '16px', color: '#4caf50', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>smartphone</span>
                                3. 스마트폰에서 접속 & 세팅
                            </h3>
                            <p style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.5, margin: 0 }}>
                                밖에서 핸드폰 사파리(Chrome)를 열고, 복사해둔 <b>2번의 링크</b>로 접속합니다. 초기 설정 창이 뜨면 각 API 키들을 입력하세요.<br />
                                <br />
                                <b>📱 꿀팁: 애플리케이션처럼 쓰기</b><br />
                                사파리 하단의 [공유] 버튼 클릭 → <b>[홈 화면에 추가]</b>를 누르시면, 전체화면으로 실행되는 완벽한 네이티브 앱 형태로 동작합니다!
                            </p>
                        </div>

                        <button
                            className="action-button full-width dark-bg"
                            onClick={() => setStep(1)}
                        >
                            <span className="material-symbols-outlined text-gray">arrow_back</span> 기존 설정 화면으로 돌아가기
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="fade-in">
                        <div className="icon-circle icon-orange mb-2" style={{ margin: '0 auto 16px auto', width: '56px', height: '56px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>travel_explore</span>
                        </div>
                        <h2 style={{ marginBottom: '8px', textAlign: 'center' }}>여행자 프로필 설정</h2>
                        <p className="text-desc" style={{ marginBottom: '24px', textAlign: 'center' }}>나만의 맞춤형 비서를 위한 기본 정보입니다.</p>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-secondary)' }}>이름 (또는 닉네임)</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={e => setProfile({ ...profile, name: e.target.value })}
                                placeholder="예: 지훈"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff' }}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-secondary)' }}>선호하는 여행 스타일</label>
                            <select
                                value={profile.favoriteStyle}
                                onChange={e => setProfile({ ...profile, favoriteStyle: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff' }}
                            >
                                <option value="현지인처럼">현지인처럼 딥하게 (로컬 문화)</option>
                                <option value="럭셔리 호캉스">럭셔리한 릴렉스 (편안함 위주)</option>
                                <option value="액티비티/도전">도전적인 탐험 (새로운 코스)</option>
                                <option value="효도/가족여행">안전하고 정석적인 코스 (가족)</option>
                            </select>
                        </div>

                        <div className="flex-between gap-12">
                            <button
                                className="action-button dark-bg padding-md text-gray"
                                onClick={() => setStep(1)}
                            >
                                이전
                            </button>
                            <button
                                className="action-button primary-bg padding-md flex-1 highlight-pulse"
                                onClick={handleSave}
                                disabled={!profile.name}
                            >
                                앱 완성하기 <span className="material-symbols-outlined">check_circle</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SetupScreen;
