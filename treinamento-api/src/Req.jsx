import { useEffect, useState } from 'react';
import { apiDragonBall } from './api/api';

export default function Req() {
    const [data, setData] = useState([]);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        apiDragonBall.get('/characters')
            .then((response) => {
                setData(response.data.items); // <- isso resolve o .map
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setErro(true);
                }
                console.error(error);
            });
    }, []);


    if (erro) {
        return <p>Personagens não encontrados (Erro 404)</p>;
    }

    return (
        <section>
            {data.map((item, index) => (
                <div key={index}>
                    <img src={item.image} alt={item.name} style={{ width: 100 }} />
                    <p>{item.name}</p>
                    <p>{item.race}</p>
                </div>
            ))}
        </section>
    );
}
