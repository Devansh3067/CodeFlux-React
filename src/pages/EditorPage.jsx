import React from 'react';
import { useState } from 'react';
import Client from '../components/Client';

const EditorPage = () => {

    const [clients, setClients] = useState([
        { socketId: 1, userName: "Devansh Bajpai" },
        { socketId: 2, userName: "Jesus Mehta" },
    ]);

    return (
        <div className='editorPageWrap'>
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img src="/Assets/CodeFlux_transparent.png" alt="CodeFluxLogo" className="logoImg" />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientList">
                        {
                            clients.map((client) => (
                                <Client
                                    key={client.socketId}
                                    username={client.userName}
                                />
                            ))
                        }
                    </div>
                </div>
                <button className='btn copyBtn'>Copy Room ID</button>
                <button className='btn leaveBtn'>Leave</button>
            </div>
            <div className="editorWrap">Editor Goes Here...</div>
        </div>
    );
}

export default EditorPage;
