import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSmartTips(locationContext) {
  const API_KEY = localStorage.getItem('GEMINI_API_KEY');

  if (!API_KEY) {
    console.error("Gemini API Key is missing!");
    return null;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const userProfile = localStorage.getItem('TRAVEL_STYLE') || "현지인처럼";
  const userName = localStorage.getItem('USER_NAME') || "사용자";

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

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
당신은 여행 일정을 파싱하는 AI 비서입니다. 
다음 사용자가 자연어로 입력한 전체 일정을 읽고, 각각의 장소 방문/이동 일정을 뽑아내어 구글 캘린더에 연동할 수 있는 JSON 배열 형식으로만 반환하세요.
오직 유효한 JSON 배열만 반환해야 합니다. 마크다운 백틱(\`\`\`)을 포함하지 마세요.

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
- 날짜가 특정되지 않았다면 오늘이나 내일 날짜 등 적절한(미래의) 타당한 임의의 ISO 날짜를 사용하세요.
- 한국 표준시(+09:00) 또는 일본 표준시(+09:00) 인코딩을 준수하세요.
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
