// src/data/questions.js

// Rastgele sayı üretmek için yardımcı fonksiyon
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Diziyi karıştırmak için yardımcı fonksiyon (Shuffle)
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

export const generateQuestions = (count = 5) => {
    const generatedQuestions = [];

    for (let i = 0; i < count; i++) {
        // 1. ADIM: 1 Tane Rastgele AI Resmi Seç (1-ai.jpg ile 8-ai.jpg arası)
        const aiNum = getRandomInt(1, 8);
        const aiImage = {
            id: `ai-${aiNum}-${i}`, // Benzersiz ID
            url: `/images/${aiNum}-ai.jpg`,
            isAi: true
        };

        // 2. ADIM: 2 Tane Rastgele Gerçek Resim Seç (1.jpg ile 18.jpg arası)
        let realNum1 = getRandomInt(1, 18);
        let realNum2 = getRandomInt(1, 18);

        // İki gerçek resim aynı olmasın diye kontrol et
        while (realNum1 === realNum2) {
            realNum2 = getRandomInt(1, 18);
        }

        const realImage1 = {
            id: `real-${realNum1}-${i}`,
            url: `/images/${realNum1}.jpg`,
            isAi: false
        };

        const realImage2 = {
            id: `real-${realNum2}-${i}`,
            url: `/images/${realNum2}.jpg`,
            isAi: false
        };

        // 3. ADIM: Resimleri birleştir ve karıştır
        const allImages = shuffleArray([aiImage, realImage1, realImage2]);

        // 4. ADIM: Soru objesini oluştur
        generatedQuestions.push({
            id: i + 1,
            images: allImages,
            // Rastgele olduğu için genel bir ipucu veriyoruz
            hint: "Görsellerdeki detaylara (eller, gözler, arka plan bozulmaları) dikkat et.",
            correctId: aiImage.id
        });
    }

    return generatedQuestions;
};