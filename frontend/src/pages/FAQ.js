import React, { useState } from 'react';

const FAQ = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const questionsAndAnswers = [
        {
            question: 'How do I upload a prescription?',
            answer: 'Click on "Upload Prescription" in the navigation bar. Select a file and upload it.',
        },
        {
            question: 'What medications are supported?',
            answer: 'We support a wide range of medications, including antibiotics, pain relievers, and more.',
        },
        {
            question: 'How do I track an order?',
            answer: 'Click on "Track Order" in the navigation bar. Enter your order number to see the status.',
        },
        {
            question: 'How do I start a telepharmacy video consultation?',
            answer: 'Go to the "Telepharmacy" page, start your camera, and begin the consultation.',
        },
    ];

    const toggleQuestion = (index) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    };

    return (
        <div style={{ textAlign: 'left', margin: '20px auto', maxWidth: '600px' }}>
            <h2>Frequently Asked Questions</h2>
            {questionsAndAnswers.map((qa, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                    <button
                        onClick={() => toggleQuestion(index)}
                        style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            background: activeQuestion === index ? '#007BFF' : '#f9f9f9',
                            color: activeQuestion === index ? 'white' : 'black',
                            cursor: 'pointer',
                        }}
                    >
                        {qa.question}
                    </button>
                    {activeQuestion === index && (
                        <p style={{ padding: '10px 15px', background: '#f1f1f1', borderRadius: '5px' }}>
                            {qa.answer}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;
