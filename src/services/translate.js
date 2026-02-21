import axios from 'axios';

export async function translateText(text, targetLang = 'ko') {
    const apiKey = localStorage.getItem('GOOGLE_TRANSLATE_API_KEY');

    if (!apiKey) {
        if (targetLang === 'ko') return "번역기 API 키가 설정되지 않았습니다.";
        else return "API key missing.";
    }

    try {
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                q: text,
                target: targetLang
            }
        );
        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error("Translation error", error);
        return "번역 오류 발생";
    }
}
