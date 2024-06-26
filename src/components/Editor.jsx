//*imports
import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Action';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!socketRef.current) return;

        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realTimeEditor'),
                {
                    mode: {
                        name: "javascript",
                        json: true
                    },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, change) => {
                const code = instance.getValue();
                onCodeChange(code);
                if (change.origin !== "setValue") {
                    console.log("code", code);
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });

            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== editorRef.current.getValue()) {
                    editorRef.current.setValue(code);
                }
            });
        }

        init();

        return () => {
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE);
            }
        };

    }, [socketRef.current]);

    return (
        <textarea id="realTimeEditor" rows={1} />
    );
}

export default Editor;
