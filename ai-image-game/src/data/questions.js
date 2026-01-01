// src/data/questions.js
export const questions = [
    {
        id: 1,
        images: [
            { id: 'A', url: '/images/real1.jpg', isAi: false },
            { id: 'B', url: '/images/ai1.jpg', isAi: true }, // AI olan bu
            { id: 'C', url: '/images/real2.jpg', isAi: false },
        ],
        hint: "Yüzdeki gölgelendirmelere ve göz bebeklerine dikkat et.",
        correctId: 'B'
    },
    // ... diğer sorular
];