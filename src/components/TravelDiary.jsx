import React, { useState } from 'react';

function TravelDiary() {
    // 임시로 사진과 메모를 로컬스토리지에 저장하는 구조
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem('TRAVEL_DIARY');
        return saved ? JSON.parse(saved) : [];
    });

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const newEntry = {
                id: Date.now(),
                image: reader.result,
                location: 'GPS 위치 (추후 연동)',
                date: new Date().toLocaleString(),
                memo: ''
            };
            const updated = [newEntry, ...entries];
            setEntries(updated);
            localStorage.setItem('TRAVEL_DIARY', JSON.stringify(updated));
        };
        reader.readAsDataURL(file);
    };

    const updateMemo = (id, text) => {
        const updated = entries.map(entry => entry.id === id ? { ...entry, memo: text } : entry);
        setEntries(updated);
        localStorage.setItem('TRAVEL_DIARY', JSON.stringify(updated));
    };

    const deleteEntry = (id) => {
        const updated = entries.filter(entry => entry.id !== id);
        setEntries(updated);
        localStorage.setItem('TRAVEL_DIARY', JSON.stringify(updated));
    };

    return (
        <div className="padding-md fade-in pb-24">
            <div className="flex-between mb-3 mt-2">
                <h2 style={{ fontSize: '20px', margin: 0 }}>📸 나의 여행 일기</h2>

                {/* 카메라 실행 버튼 */}
                <label className="action-button primary-bg pulse" style={{ display: 'inline-flex', cursor: 'pointer', padding: '8px 16px', fontSize: '14px' }}>
                    <span className="material-symbols-outlined mr-1" style={{ fontSize: '18px' }}>photo_camera</span>
                    사진 찍기
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>

            <p className="text-desc mb-3">여행 중 찍은 사진과 위치를 기록하여 나만의 일기를 만들어보세요!</p>

            {entries.length === 0 ? (
                <div className="card timeline-card flex-center border-medium" style={{ height: '200px', flexDirection: 'column', color: '#666' }}>
                    <span className="material-symbols-outlined mb-2" style={{ fontSize: '36px' }}>menu_book</span>
                    아직 기록된 일기가 없습니다.<br />위 버튼을 눌러 첫 사진을 남겨보세요!
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {entries.map(entry => (
                        <div key={entry.id} className="card timeline-card overflow-hidden border-orange no-padding">
                            <img src={entry.image} alt="Diary" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                            <div className="padding-md">
                                <div className="flex-between mb-2">
                                    <span className="time-badge">
                                        <span className="material-symbols-outlined mr-1" style={{ fontSize: '14px' }}>location_on</span>
                                        {entry.location}
                                    </span>
                                    <span style={{ fontSize: '12px', color: '#888' }}>{entry.date}</span>
                                </div>
                                <textarea
                                    value={entry.memo}
                                    onChange={(e) => updateMemo(entry.id, e.target.value)}
                                    placeholder="이 장소에서의 짧은 메모를 남겨주세요."
                                    style={{ width: '100%', border: 'none', background: 'transparent', color: '#fff', fontSize: '15px', resize: 'none', outline: 'none', borderBottom: '1px solid #333', paddingBottom: '8px' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                                    <button className="icon-button" onClick={() => deleteEntry(entry.id)} style={{ color: '#ffaaaa' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TravelDiary;
