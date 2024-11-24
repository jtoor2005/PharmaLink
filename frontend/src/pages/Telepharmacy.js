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

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Telepharmacy Video Consultation</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div>
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        style={{
                            width: '300px',
                            height: '200px',
                            backgroundColor: 'black',
                        }}
                    ></video>
                    <p>Local Video</p>
                </div>
                <div>
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        style={{
                            width: '300px',
                            height: '200px',
                            backgroundColor: 'black',
                        }}
                    ></video>
                    <p>Remote Video</p>
                </div>
            </div>
            {!callInProgress && (
                <button onClick={startLocalStream} style={{ margin: '10px' }}>
                    Start Camera
                </button>
            )}
            {!callInProgress && (
                <button onClick={startCall} style={{ margin: '10px' }}>
                    Start Call
                </button>
            )}
            {callInProgress && <p>Call in progress...</p>}
        </div>
    );
};

export default Telepharmacy;
