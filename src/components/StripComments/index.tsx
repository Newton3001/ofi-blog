
import clsx from 'clsx';
import * as React from 'react';
import styles from './styles.module.scss';
import { mdiClipboard, mdiClipboardCheck, mdiClipboardText, mdiClipboardTextOff, mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

interface Props {
    text?: string;
}

const ICONS = {
    idle: mdiClipboardText,
    processing: mdiLoading,
    success: mdiClipboardCheck,
    error: mdiClipboardTextOff
}

const COLORS = {
    idle: 'var(--ifm-color-secondary)',
    processing: 'var(--ifm-link-color)',
    success: 'var(--ifm-color-success)',
    error: 'var(--ifm-color-error)'
}

const StripComments = (props: Props) => {
    const [txt, setTxt] = React.useState('');
    const [stripped, setStripped] = React.useState('');
    const [copyState, setCopyState] = React.useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const ref = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        setTxt(props.text);
    }, [props.text]);

    React.useEffect(() => {
        if (typeof txt ==='string' && txt !== stripped) {
            const strippedText = `${txt.replace(/\s*[;#].*\n?/g, '\n').replace(/^\s*\n/g, '').trimEnd()}\n`;
            setStripped(strippedText);
            setTxt(strippedText);
            if (ref.current) {
                const pos = Math.max(ref.current.selectionStart, ref.current.selectionEnd, 0);
                setTimeout(() => ref.current.setSelectionRange(pos, pos), 0);
            }
        }
    }, [txt, ref]);

    React.useEffect(() => {
        if (copyState === 'success' || copyState === 'error') {
            setTimeout(() => setCopyState('idle'), 2000);
        } 
    }, [copyState]);


    return (
        <div className={clsx('hero', 'shadow--lw', styles.container)}>
            <div className="container">
                <p className="hero__subtitle">Kommentare Entfernen</p>
                <h4>Assembler-Code</h4>
                <div className={styles.inputContainer}>
                    <textarea
                        ref={ref}
                        className={clsx(styles.input)}
                        value={txt}
                        onChange={(e) => {
                            if (e.target.value === stripped) {
                                return;
                            }
                            setTxt(e.target.value);
                            const pos = Math.max(e.target.selectionStart, e.target.selectionEnd);
                            setTimeout(() => e.target.setSelectionRange(pos, pos), 0);
                        }}
                        rows={Math.max(5, (txt || '').split('\n').length)}
                        placeholder="Assembler-Code mit Kommentaren ;"
                    ></textarea>
                </div>
                <button
                    className={clsx('button', 'button--primary', 'button--block', styles.button)}
                    onClick={() => {
                        navigator.clipboard.writeText(stripped).then(() => {
                            setCopyState('success');
                        }).catch(() => {
                            setCopyState('error');
                        });
                    }}
                >
                    <div className={clsx(styles.flex)}>
                        <div>
                            Code ohne Kommentare Kopieren 
                        </div>
                        <Icon path={ICONS[copyState]} color={COLORS[copyState]} size={1} spin={copyState === 'processing'} />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default StripComments;