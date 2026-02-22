import React, { useState, useEffect } from 'react';
import { generateVirtualTourExperience } from '../services/ai';

function VirtualTour({ events, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [narration, setNarration] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (events && events.length > 0) {
            fetchNarration(0);
        }
    }, [events]);

    const fetchNarration = async (index) => {
        setLoading(true);
        setNarration('가상 체험 생성을 위해 AI 안내원이 안내 멘트를 준비하고 있습니다...');
        const text = await generateVirtualTourExperience(events[index], index, events.length);
        setNarration(text);
        setLoading(false);
    };

    const handleNext = () => {
        if (currentIndex < events.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            fetchNarration(nextIndex);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            fetchNarration(prevIndex);
        }
    };

    if (!events || events.length === 0) {
        return (
            <div className="card padding-md text-center mt-3">
                <p>일정이 등록되지 않아 가상 체험을 시작할 수 없습니다.</p>
                <button className="action-button outline-button mt-2" onClick={onClose}>돌아가기</button>
            </div>
        );
    }

    const isLast = currentIndex === events.length - 1;
    const currentEvent = events[currentIndex];

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', color: '#fff' }}>
            {/* Header */}
            <div style={{ padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
                <div>
                    <span style={{ color: 'var(--primary-light)', fontSize: '13px', fontWeight: 'bold' }}>가상 여행 체험 모드</span>
                    <h2 style={{ fontSize: '18px', margin: '4px 0 0 0' }}>Step {currentIndex + 1} / {events.length}</h2>
                </div>
                <button className="icon-button" onClick={onClose} style={{ color: '#aaa' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>close</span>
                </button>
            </div>

            {/* Content Body */}
            <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <div className="card border-primary" style={{ background: 'linear-gradient(135deg, rgba(19,91,236,0.2) 0%, rgba(26,26,26,0.9) 100%)', boxShadow: '0 8px 32px rgba(19,91,236,0.2)' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '8px', color: '#fff' }}>{currentEvent.summary}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', fontSize: '14px', marginBottom: '16px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span> {currentEvent.time}
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', marginLeft: '8px' }}>location_on</span> {currentEvent.location}
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '12px', minHeight: '120px', position: 'relative' }}>
                        {loading ? (
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#888' }}>
                                <span className="material-symbols-outlined pulse" style={{ fontSize: '24px', color: 'var(--primary-light)' }}>auto_awesome</span>
                                <span style={{ fontSize: '15px', lineHeight: '1.5' }}>{narration}</span>
                            </div>
                        ) : (
                            <div className="fade-in" style={{ fontSize: '16px', lineHeight: '1.6', color: '#eee', letterSpacing: '-0.3px', whiteSpace: 'pre-line' }}>
                                "{narration}"
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div style={{ padding: '24px 20px', display: 'flex', gap: '12px', background: '#111', borderTop: '1px solid #222' }}>
                <button
                    className="action-button outline-button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0 || loading}
                    style={{ flex: 1, color: currentIndex === 0 ? '#444' : '#fff', borderColor: currentIndex === 0 ? '#333' : '#555' }}
                >
                    <span className="material-symbols-outlined mr-1">arrow_back</span>
                    이전
                </button>

                {isLast ? (
                    <button
                        className="action-button primary-bg"
                        onClick={onClose}
                        style={{ flex: 2 }}
                    >
                        체험 종료 <span className="material-symbols-outlined ml-1">flag</span>
                    </button>
                ) : (
                    <button
                        className="action-button primary-bg"
                        onClick={handleNext}
                        disabled={loading}
                        style={{ flex: 2 }}
                    >
                        다음 장소로 <span className="material-symbols-outlined ml-1">arrow_forward</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default VirtualTour;
