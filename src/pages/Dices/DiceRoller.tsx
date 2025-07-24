import { useEffect } from 'react';
import { Dices } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';
import { Alert } from '@/utils/Functions';

export const DiceRoller = ({ sides = 6 }: { sides: number }) => {
    useEffect(() => {
        const rollDice = async () => {
            Alert({
                title: 'Lanzando el dado...',
                html: ReactDOMServer.renderToString(
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80px',
                        overflow: 'hidden'
                    }}>
                        <Dices size={48} className="dice-spin" />
                    </div>
                ),
                showConfirmButton: false,
                allowOutsideClick: false,
                backdrop: true,
                timer: 2000,
            });

            await new Promise((res) => setTimeout(res, 1000));

            const number = Math.floor(Math.random() * sides) + 1;
            Alert({
                title: `Resultado: ${number}`,
                html: `<span style="font-size: 3rem;">🎲 ${number}</span>`,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
            });
        };

        rollDice();
    }, [sides]);

    return null;
};
