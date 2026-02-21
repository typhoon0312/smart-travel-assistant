import React from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

const MAP_CONTAINER_STYLE = {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
};

// 메이지 신궁 위도/경도
const DEFAULT_CENTER = {
    lat: 35.6764,
    lng: 139.6993,
};

function MiniMap({ apiKey }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });

    const [directions, setDirections] = React.useState(null);

    React.useEffect(() => {
        if (isLoaded && window.google) {
            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: { lat: 35.6764, lng: 139.6993 }, // 메이지 신궁
                    destination: { lat: 35.6580, lng: 139.7016 }, // 시부야 스크램블 교차로
                    travelMode: window.google.maps.TravelMode.TRANSIT, // 대중교통
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error(`Error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [isLoaded]);

    if (!isLoaded) return <div className="map-placeholder pulse">지도를 불러오는 중...</div>;

    return (
        <div style={{ height: '240px', width: '100%', padding: '12px 16px 0 16px' }}>
            <GoogleMap
                mapContainerStyle={MAP_CONTAINER_STYLE}
                center={DEFAULT_CENTER}
                zoom={14}
                options={{
                    disableDefaultUI: true, // 깔끔한 모바일 UI를 위해 기본 컨트롤 숨김
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                        {
                            featureType: "administrative.locality",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "poi",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "poi.park",
                            elementType: "geometry",
                            stylers: [{ color: "#263c3f" }],
                        },
                        {
                            featureType: "poi.park",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#6b9a76" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [{ color: "#38414e" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#212a37" }],
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#9ca5b3" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "geometry",
                            stylers: [{ color: "#746855" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#1f2835" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#f3d19c" }],
                        },
                        {
                            featureType: "transit",
                            elementType: "geometry",
                            stylers: [{ color: "#2f3948" }],
                        },
                        {
                            featureType: "transit.station",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#17263c" }],
                        },
                        {
                            featureType: "water",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#515c6d" }],
                        },
                        {
                            featureType: "water",
                            elementType: "labels.text.stroke",
                            stylers: [{ color: "#17263c" }],
                        },
                    ], // 구글 맵 다크 테마 적용
                }}
            >
                {directions && (
                    <DirectionsRenderer
                        directions={directions}
                        options={{
                            suppressMarkers: false,
                            polylineOptions: {
                                strokeColor: '#4b82f3', // 앱 테마색상 (파란색)
                                strokeWeight: 5,
                            },
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    );
}

export default MiniMap;
