import React, { useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to the signaling server

const Telepharmacy = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const [callInProgress, setCallInProgress] = useState(false);

    const startLocalStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;

            peerConnection.current = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: 'stun:stun.l.google.com:19302',
                    },
                ],
            });

            stream.getTracks().forEach((track) => {
                peerConnection.current.addTrack(track, stream);
            });

            peerConnection.current.ontrack = (event) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };

            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('ice-candidate', event.candidate);
                }
            };

            socket.on('offer', async (offer) => {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                socket.emit('answer', answer);
            });

            socket.on('answer', async (answer) => {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
            });

            socket.on('ice-candidate', (candidate) => {
                peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
            });
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    const startCall = async () => {
        if (!peerConnection.current) return;

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit('offer', offer);

        setCallInProgress(true);
    };

    const endCall = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }

        localVideoRef.current.srcObject = null;
        remoteVideoRef.current.srcObject = null;

        setCallInProgress(false);
    };

    return (
        <div className="telepharmacy-container" style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Telepharmacy Video Consultation</h2>
            <div className="video-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div className="video-box" style={{ textAlign: 'center' }}>
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        style={{
                            width: '320px', // Slightly larger width
                            height: '240px', // Slightly larger height
                            backgroundColor: 'black',
                            border: '1px solid gray',
                        }}
                    ></video>
                    <p>Local Video</p>
                </div>
                <div className="video-box" style={{ textAlign: 'center' }}>
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        style={{
                            width: '320px', // Slightly larger width
                            height: '240px', // Slightly larger height
                            backgroundColor: 'black',
                            border: '1px solid gray',
                        }}
                    ></video>
                    <p>{callInProgress ? 'Remote Video' : 'Waiting for remote peer...'}</p>
                </div>
            </div>
            <div className="controls">
                {!callInProgress && (
                    <>
                        <button onClick={startLocalStream} style={{ margin: '10px' }}>
                            Start Camera
                        </button>
                        <button onClick={startCall} style={{ margin: '10px' }}>
                            Start Call
                        </button>
                    </>
                )}
                {callInProgress && (
                    <button
                        onClick={endCall}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            margin: '10px',
                        }}
                    >
                        End Call
                    </button>
                )}
            </div>
        </div>
    );
};

export default Telepharmacy;
