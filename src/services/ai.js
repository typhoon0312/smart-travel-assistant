import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSmartTips(locationContext) {
  const API_KEY = localStorage.getItem('GEMINI_API_KEY');

  if (!API_KEY) {
    console.error("Gemini API Key is missing!");
    return null;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const userProfile = localStorage.getItem('TRAVEL_STYLE') || "현지인처럼";
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
당신은 스마트 여행 비서입니다. 사용자인 "${userName}"님이 "${locationContext}" 주변에서 여행 일정을 소화 중입니다.
이 사용자의 여행 취향은 "${userProfile}"입니다. 

이 정보를 바탕으로, 다음 3가지 컨텍스트 카드를 만들 빈틈없고 유용한 JSON 데이터를 한국어로 반환하세요.
오직 유효한 JSON 포맷만 반환해야 합니다. 마크다운 백틱(\`\`\`)을 포함하지 마세요.

형식:
{
  "recommendations": {
    "title": "루트 근처 숨은 명소/쇼핑",
    "description": "일정에 여유가 있다면 들르기 좋은 두 곳",
    "places": [
      { "name": "장소 이름 1", "mapQuery": "영문 검색어 1" },
      { "name": "장소 이름 2", "mapQuery": "영문 검색어 2" }
    ]
  },
  "etiquette": {
    "title": "${locationContext} 방문 에티켓",
    "mainDesc": "필수로 알아야 할 가장 중요한 매너/팁 1문장",
    "tags": ["핵심키워드1", "핵심키워드2"]
  },
  "dining": {
    "title": "현지인 추천 메뉴 & 가이드",
    "items": ["메뉴명1", "메뉴명2", "메뉴명3"],
    "phrase": {
      "japanese": "현지 직원에 바로 쓸수 있는 일본어 한글 발음 표기",
      "meaning": "그 표현의 한국어 뜻",
      "original": "일본어 원문"
    }
  }
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    // JSON 파싱 에러 방지를 위한 마크다운 백틱 제거
    if (text.startsWith('\`\`\`json')) {
      text = text.substring(7, text.length - 3).trim();
    } else if (text.startsWith('\`\`\`')) {
      text = text.substring(3, text.length - 3).trim();
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating tips from Gemini:", error);
    return null;
  }
}

export async function parseFreeformItinerary(freeformText) {
  const API_KEY = localStorage.getItem('GEMINI_API_KEY');
  if (!API_KEY) return null;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
당신은 완벽하고 똑똑한 여행 일정 추출 전문 AI 비서입니다. 
다음 사용자가 복사하여 붙여넣은 매우 길고 형식이 불규칙한 전체 일정 택스트를 처음부터 끝까지 정독하세요.문맥을 파악하여 각각의 장소 방문이나 이동 일정을 차례대로 꼼꼼히 뽑아내어 구글 캘린더에 연동할 수 있는 JSON 배열 형식으로만 반환해야 합니다.
오직 유효한 JSON 배열만 반환해야 합니다. 마크다운 백틱(\`\`\`)을 포함하지 마세요. 사용자의 텍스트가 매우 길더라도 누락되는 일정이 없도록 모두 파싱하세요.

입력 텍스트: "${freeformText}"

형식 예시:
[
  {
    "summary": "신주쿠에서 쇼핑",
    "location": "신주쿠, 도쿄",
    "time": "10:00 AM",
    "startTimeIso": "2024-10-24T10:00:00+09:00",
    "endTimeIso": "2024-10-24T12:00:00+09:00"
  },
  {
    "summary": "시부야 점심",
    "location": "시부야 츠타야, 도쿄",
    "time": "13:00 PM",
    "startTimeIso": "2024-10-24T13:00:00+09:00",
    "endTimeIso": "2024-10-24T14:30:00+09:00"
  }
]

참고사항: 
- 텍스트 덩어리에서 시간, 장소, 할 일을 추론하여 하나하나 객체로 만드세요.
- 날짜가 명시되지 않았다면 미래의 한 날짜(예: 이번 주말)를 기준으로 시간순으로 배치하세요.
- 각 일정별 소요 시간을 문맥에 맞게 추정하여 startTimeIso와 endTimeIso를 구성하세요.
- 한국 표준시(+09:00) 또는 현지 표준시 인코딩 포맷을 시와 분과 초 까지 정확히 준수하세요.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    if (text.startsWith('\`\`\`json')) {
      text = text.substring(7, text.length - 3).trim();
    } else if (text.startsWith('\`\`\`')) {
      text = text.substring(3, text.length - 3).trim();
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing freeform itinerary:", error);
    return [];
  }
}

export async function generateVirtualTourExperience(eventInfo, currentIndex, totalEvents) {
  const API_KEY = localStorage.getItem('GEMINI_API_KEY');
  if (!API_KEY) return "API 키가 설정되지 않아 가상 체험을 생성할 수 없습니다.";

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
당신은 생생한 여행 가이드입니다.
사용자는 여행을 가기 전에 일정에 따라 '가상 체험(Virtual Tour)'을 하고 있습니다.
현재 일정은 전체 ${totalEvents}개의 일정 중 ${currentIndex + 1}번째 일정입니다.

일정 정보:
장소/이름: ${eventInfo.summary}
비고/위치: ${eventInfo.location || '정보 없음'}
시간: ${eventInfo.time || '정보 없음'}

이 정보들을 바탕으로 사용자가 이 장소에서 실제로 경험하게 될 상황, 분위기, 소리, 냄새, 날씨 느낌 등을 3~4문장으로 아주 생생하고 몰입감 있게 묘사해 주세요. 사용자가 실제 여행에 온 것 같은 설렘을 주어야 합니다.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error generating virtual tour text:", error);
    return "현재 가상 체험 데이터를 불러오는 중 오류가 발생했습니다.";
  }
}
