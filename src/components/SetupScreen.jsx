import React, { useState, useEffect } from 'react';

function SetupScreen({ onComplete, isEditing = false }) {
    const [keys, setKeys] = useState({
        gemini: localStorage.getItem('GEMINI_API_KEY') || '',
        googleMaps: localStorage.getItem('GOOGLE_MAPS_API_KEY') || '',
        googleTranslate: localStorage.getItem('GOOGLE_TRANSLATE_API_KEY') || '',
        googleClientId: localStorage.getItem('GOOGLE_CLIENT_ID') || '',
    });

    const [profile, setProfile] = useState({
        appName: localStorage.getItem('APP_NAME') || '',
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
        localStorage.setItem('APP_NAME', profile.appName || '나만의 스마트 여행 비서');
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
                        <p className="text-desc" style={{ marginBottom: '24px' }}>오픈소스 스마트 여행 앱 초기 설정입니다.<br />개인정보 및 API 키는 외부에 유출되지 않고 오직 접속하신 기기 내부에만 안전하게 저장됩니다.</p>

                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>나만의 앱 이름 (선택)</label>
                            </div>
                            <input
                                type="text"
                                value={profile.appName}
                                onChange={e => setProfile({ ...profile, appName: e.target.value })}
                                placeholder="예: 철중이의 오사카 비서"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff' }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Gemini API Key (필수)</label>
                                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary-light)', textDecoration: 'none' }}>AI 핵심 두뇌 무료 발급 링크 ↗</a>
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
                                <a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary-light)', textDecoration: 'none' }}>지도 시각화 키 발급 ↗</a>
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
                                <a href="https://console.cloud.google.com/apis/library/translate.googleapis.com" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary-light)', textDecoration: 'none' }}>번역 API 발급 링크 ↗</a>
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
                                <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary-light)', textDecoration: 'none' }}>캘린더 연동 클라이언트 ID 발급 ↗</a>
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

                        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #333', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>나만의 개인 서버로 구축하여 스마트폰에서 24시간 사용</p>
                            <button className="action-button primary-bg text-white" onClick={() => setStep('vercel-guide')} style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>rocket_launch</span>
                                평생 무료 Vercel 배포 가이드 (추천)
                            </button>
                            <button className="action-button outline-button text-primary" onClick={() => setStep('guide')} style={{ border: '1px solid var(--primary)', padding: '8px 16px', fontSize: '13px' }}>
                                📖 맥미니/PC를 개인 서버로 만드는 홈링크 가이드
                            </button>
                        </div>
                    </div>
                )}

                {step === 'vercel-guide' && (
                    <div className="fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '20px', margin: 0 }}>🚀 Vercel 1분 무료 배포</h2>
                            <button className="icon-button padding-0" onClick={() => setStep(1)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <p className="text-desc" style={{ marginBottom: '24px', fontSize: '13px', lineHeight: 1.5, color: '#ccc' }}>
                            서버 PC를 항상 켜둘 필요 없이, 코드를 Vercel에 올려두면 평생 무료로 나만의 여행 비서 웹앱을 운영할 수 있습니다. API 키는 코드에 올라가지 않고, 본인(그리고 본인과 주소를 공유한 사람)의 휴대폰에만 저장되어 완벽히 안전합니다.
                        </p>

                        <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#222', borderRadius: '12px', border: '1px solid #333' }}>
                            <h3 style={{ fontSize: '15px', color: 'var(--primary-light)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>code_blocks</span>
                                1. GitHub에 소스코드 올리기
                            </h3>
                            <p style={{ fontSize: '12px', color: '#ccc', lineHeight: 1.5, margin: 0 }}>
                                GitHub에서 새 Repository(예: `smart-travel-app`)를 생성한 뒤, 현재 코드가 있는 폴더 터미널에서 다음을 차례로 입력하세요.<br />
                                <code style={{ backgroundColor: '#000', padding: '6px', borderRadius: '4px', display: 'block', marginTop: '8px', color: '#fff', fontSize: '11px', whiteSpace: 'pre' }}>
                                    git init<br />
                                    git add .<br />
                                    git commit -m "Travel App Initial Commit"<br />
                                    git branch -M main<br />
                                    git remote add origin [내 깃허브 주소]<br />
                                    git push -u origin main
                                </code>
                            </p>
                        </div>

                        <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#222', borderRadius: '12px', border: '1px solid #333' }}>
                            <h3 style={{ fontSize: '15px', color: '#ffeb3b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cloud_done</span>
                                2. Vercel에서 배포하기
                            </h3>
                            <p style={{ fontSize: '12px', color: '#ccc', lineHeight: 1.5, margin: 0 }}>
                                1. <a href="https://vercel.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-light)' }}>Vercel.com</a> 에 깃허브 계정으로 로그인합니다.<br />
                                2. 대시보드에서 <b>Add New... &gt; Project</b> 클릭<br />
                                3. 방금 올린 저장소 옆의 <b>Import</b> 클릭<br />
                                4. 기타 설정 없이 파란색 <b>Deploy</b> 버튼 클릭!
                            </p>
                            <p style={{ fontSize: '12px', color: '#ffb74d', marginTop: '12px', padding: '8px', backgroundColor: 'rgba(255, 152, 0, 0.1)', borderRadius: '6px' }}>
                                💡 약 1분 후 `https://머시기.vercel.app` 형태의 배포 주소가 제공됩니다!
                            </p>
                        </div>

                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#222', borderRadius: '12px', border: '1px solid #333' }}>
                            <h3 style={{ fontSize: '15px', color: '#4caf50', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>smartphone</span>
                                3. 스마트폰에서 영구 사용 설정
                            </h3>
                            <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.5, margin: 0 }}>
                                Vercel에서 발급한 주소를 스마트폰 웹브라우저(크롬, 사파리)로 엽니다.<br />
                                <b>✅ [홈 화면에 추가]</b> 하시면 마치 네이티브 앱 아이콘처럼 바탕화면에 저장되어 24시간 언제든 여행지에서 접속할 수 있습니다.
                            </p>
                        </div>

                        <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#222', borderRadius: '12px', border: '1px solid #333' }}>
                            <h3 style={{ fontSize: '15px', color: '#ffb74d', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>help</span>
                                Vercel 배포 후 사용방법
                            </h3>
                            <p style={{ fontSize: '12px', color: '#ccc', lineHeight: 1.5, margin: 0 }}>
                                1. 제공된 `vercel.app` 링크를 브라우저에 입력하여 언제라도 접속합니다.<br />
                                2. 처음 접속하는 기기마다 발급받은 API 키를 한 번씩 입력하여 로그인 없이 안전하게 개인화해서 사용합니다.<br />
                                3. 친구나 가족에게 링크를 공유할 경우, 각자의 핸드폰에서 본인만의 API 키를 입력하게 되므로 내 과금이나 개인정보 유출 우려가 전혀 없습니다.
                            </p>
                        </div>

                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: 'rgba(255, 105, 180, 0.1)', borderRadius: '12px', border: '1px solid rgba(255, 105, 180, 0.3)', textAlign: 'center' }}>
                            <p style={{ fontSize: '15px', color: '#ff69b4', margin: 0, fontWeight: 'bold' }}>
                                ✨ 이 프로그램 사용하는 모든 분들 행복하세요! ✨
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

                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: 'rgba(255, 105, 180, 0.1)', borderRadius: '12px', border: '1px solid rgba(255, 105, 180, 0.3)', textAlign: 'center' }}>
                            <p style={{ fontSize: '15px', color: '#ff69b4', margin: 0, fontWeight: 'bold' }}>
                                ✨ 이 프로그램 사용하는 모든 분들 행복하세요! ✨
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

                        <div style={{ marginTop: '32px', textAlign: 'center', padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(255, 105, 180, 0.1)', border: '1px solid rgba(255, 105, 180, 0.3)' }}>
                            <p style={{ fontSize: '15px', color: '#ff69b4', margin: 0, fontWeight: 'bold' }}>
                                ✨ 이 프로그램 사용하는 모든 분들 행복하세요! ✨
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SetupScreen;
