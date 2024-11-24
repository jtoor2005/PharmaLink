import React, { useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

const Telepharmacy = () => {
    const [stream, setStream] = useState(null);
    const [peer, setPeer] = useState(null);
    const videoRef = useRef();

    const startCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(stream);
            videoRef.current.srcObject = stream;

            const peer = new SimplePeer({ initiator: true, trickle: false, stream });
            setPeer(peer);
        } catch (error) {
            console.error('Error starting video call:', error);
        }
    };

    return (
        <div>
            <h2>Telepharmacy Video Call</h2>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }}></video>
            <button onClick={startCall}>Start Call</button>
        </div>
    );
};

export default Telepharmacy;
