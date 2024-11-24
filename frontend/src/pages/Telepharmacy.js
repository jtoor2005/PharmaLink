import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

const Telepharmacy = () => {
    const [stream, setStream] = useState(null);
    const [peer, setPeer] = useState(null);
    const [connected, setConnected] = useState(false);
    const videoRef = useRef();
    const peerVideoRef = useRef();
    const [signalData, setSignalData] = useState('');

    useEffect(() => {
        // Get user media for local video
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = currentStream;
                }
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
            });
    }, []);

    const startCall = () => {
        const p = new Peer({ initiator: true, trickle: false, stream });

        // Listen for signal data
        p.on('signal', (data) => {
            console.log('Signal Data:', data);
            setSignalData(JSON.stringify(data));
        });

        // Listen for peer stream
        p.on('stream', (peerStream) => {
            if (peerVideoRef.current) {
                peerVideoRef.current.srcObject = peerStream;
            }
        });

        // Listen for connection
        p.on('connect', () => {
            setConnected(true);
            console.log('Connected to peer');
        });

        setPeer(p);
    };

    const connectToPeer = (data) => {
        if (!peer) {
            const p = new Peer({ initiator: false, trickle: false, stream });
            setPeer(p);

            p.on('stream', (peerStream) => {
                if (peerVideoRef.current) {
                    peerVideoRef.current.srcObject = peerStream;
                }
            });

            p.on('connect', () => {
                setConnected(true);
                console.log('Connected to peer');
            });

            p.signal(JSON.parse(data));
        } else {
            peer.signal(JSON.parse(data));
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Telepharmacy Video Call</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{ width: '300px', border: '1px solid black' }}
                />
                <video
                    ref={peerVideoRef}
                    autoPlay
                    style={{ width: '300px', border: '1px solid black' }}
                />
            </div>
            {!connected && (
                <div>
                    <button onClick={startCall} style={{ margin: '10px', padding: '10px 20px' }}>
                        Start Call
                    </button>
                    <textarea
                        value={signalData}
                        readOnly
                        style={{ width: '400px', height: '100px', margin: '10px', display: 'block' }}
                        placeholder="Signal Data to share"
                    />
                    <textarea
                        placeholder="Paste Signal Data from other peer"
                        onChange={(e) => connectToPeer(e.target.value)}
                        style={{ width: '400px', height: '100px', margin: '10px', display: 'block' }}
                    />
                </div>
            )}
            {connected && <p>Connected to peer. Video call in progress...</p>}
        </div>
    );
};

export default Telepharmacy;

