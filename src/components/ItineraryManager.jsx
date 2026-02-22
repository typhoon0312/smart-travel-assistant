import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { parseFreeformItinerary } from '../services/ai';

function ItineraryManager({ onAddEvent }) {
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [syncLoading, setSyncLoading] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [parsedEvents, setParsedEvents] = useState([]);

    const gClient = localStorage.getItem('GOOGLE_CLIENT_ID');

    const addManualEvent = () => {
        if (!inputText.trim()) return;
        onAddEvent({
            summary: inputText,
            location: inputText, // simple default
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setInputText('');
    };

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            setAccessToken(tokenResponse.access_token);
            setSyncLoading(true);
            try {
                const userInfo = await axios.get(
                    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
                    {
                        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                        params: {
                            timeMin: new Date().toISOString(),
                            maxResults: 5,
                            singleEvents: true,
                            orderBy: 'startTime',
                        }
                    }
                );

                if (userInfo.data.items && userInfo.data.items.length > 0) {
                    userInfo.data.items.forEach(ev => {
                        onAddEvent({
                            summary: ev.summary,
                            location: ev.location || ev.summary,
                            time: new Date(ev.start.dateTime || ev.start.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        });
                    });
                } else {
                    alert('구글 캘린더에 연동할 다가오는 일정이 없습니다.');
                }
            } catch (e) {
                console.error(e);
                alert('구글 캘린더에서 정보를 가져오는 중 에러가 발생했습니다.');
            } finally {
                setSyncLoading(false);
            }
        },
        scope: "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events"
    });

    const handleAIParsing = async () => {
        if (!inputText.trim()) {
            alert('일정 텍스트를 입력해주세요.');
            return;
        }

        setLoading(true);
        let events;
        try {
            events = await parseFreeformItinerary(inputText);
            if (!events || events.length === 0) {
                alert('AI가 일정을 분석하지 못했습니다. 형식을 좀 더 구체적으로 적어주세요.');
                setLoading(false);
                return;
            }
        } catch (error) {
            alert('AI 분석 중 에러가 발생했습니다: ' + error.message);
            setLoading(false);
            return;
        }

        setParsedEvents(events);

        // 2. 부모(App.jsx) 컴포넌트로 이벤트 퍼올리기
        events.forEach(ev => {
            onAddEvent({
                summary: ev.summary,
                location: ev.location,
                time: ev.time || new Date(ev.startTimeIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        });

        // 3. 구글 캘린더에 저장 (액세스 토큰이 있을 경우에만)
        if (accessToken) {
            try {
                for (const ev of events) {
                    await axios.post(
                        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
                        {
                            summary: ev.summary,
                            location: ev.location,
                            start: { dateTime: ev.startTimeIso, timeZone: 'Asia/Seoul' },
                            end: { dateTime: ev.endTimeIso, timeZone: 'Asia/Seoul' }
                        },
                        {
                            headers: { Authorization: `Bearer ${accessToken}` }
                        }
                    );
                }
                alert('✔ 구글 캘린더에 성공적으로 자동 저장되었습니다!');
            } catch (e) {
                console.error('Calendar Save Error:', e);
                alert('일정을 캘린더에 저장하는데 문제가 발생했습니다. (권한 확인 필요)');
            }
        }

        setLoading(false);
        setInputText('');
    };

    const openMapRoute = () => {
        if (parsedEvents.length === 0) {
            alert("먼저 일정을 분석해주세요.");
            return;
        }
        // 구글 맵 다중 경유지 검색 링크 만들기 (dir)
        const origin = encodeURIComponent(parsedEvents[0].location);
        const destination = encodeURIComponent(parsedEvents[parsedEvents.length - 1].location);
        const waypoints = parsedEvents.slice(1, -1).map(ev => encodeURIComponent(ev.location)).join('|');
        let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
        if (waypoints) url += `&waypoints=${waypoints}`;

        window.open(url, '_blank');
    };

    return (
        <div className="card gradient-card padding-md" style={{ marginBottom: '24px' }}>
            <h3 className="card-title mb-2">여행 일정 추가하기</h3>
            <p className="text-desc mb-2">구글 캘린더에서 일정을 자동으로 불러오거나 직접 텍스트로 추가할 수 있습니다.</p>

            {gClient && !accessToken ? (
                <button
                    className="action-button full-width outline-button mb-3"
                    onClick={() => login()}
                    disabled={syncLoading}
                    style={{ borderColor: '#4285F4', color: '#4285F4', justifyContent: 'center' }}
                >
                    <span className="material-symbols-outlined mr-1">calendar_month</span>
                    {syncLoading ? "동기화 권한 요청 중..." : "구글 캘린더 연동하기"}
                </button>
            ) : gClient && accessToken ? (
                <div style={{ padding: '8px', background: 'rgba(66, 133, 244, 0.1)', borderRadius: '8px', marginBottom: '12px', fontSize: '12px', color: '#4285F4', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                    구글 캘린더 연동됨 (일정 자동 저장 활성화)
                </div>
            ) : (
                <div style={{ padding: '8px', background: 'rgba(255,100,100,0.1)', borderRadius: '8px', marginBottom: '12px', fontSize: '12px', color: '#ffaaaa' }}>
                    💡 [환경설정]에서 Google OAuth Client ID를 입력하시면 캘린더 자동 저장이 가능합니다.
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <textarea
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="예: 내일 오전 10시 메이지 신궁 둘러보고, 오후 1시쯤 시부야 넘어가서 쇼핑한 뒤에 저녁 7시에 록폰기 힐즈 갈래"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#1a1a1a', color: '#fff', minHeight: '80px', resize: 'vertical' }}
                />

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className="action-button primary-bg flex-1 pulse"
                        onClick={handleAIParsing}
                        disabled={loading}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '4px' }}>magic_button</span>
                        {loading ? "AI가 일정 분석 및 저장 중..." : "AI 전체 일정 분석 & 저장"}
                    </button>

                    {parsedEvents.length > 0 && (
                        <button
                            className="action-button dark-bg"
                            onClick={openMapRoute}
                            style={{ padding: '0 16px' }}
                            title="전체 경로 구글 맵 열기"
                        >
                            <span className="material-symbols-outlined text-primary">map</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItineraryManager;
