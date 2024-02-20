import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Home.css'
import fondo from '../assets/Imagen1.png'
export const HomeApp = () => {
    const letters = ['A', 'B', 'C', 'D'];
    const [question, setquestion] = useState(null);
    const [estado, setEstado] = useState({});
    const [puesto, setPuesto] = useState({ index: 1, points: 0 });
    const [fin, setfin] = useState(false);
    useEffect(() => {
        getQuestion();
    }, [])
    const getQuestion = () => {
        setquestion(null);
        axios.get('https://cultura-general.azurewebsites.net/api/generate')
            .then(res => {
                setquestion(JSON.parse(res.data));
            })
            .catch(error => {
               getQuestion();
                console.log(error);
            })
    }
    const responder = (index, answer) => {
        let valido = false;
        if (answer == question.correcta) {
            setEstado({ index, value: 'correcto' });
            valido = true;
        } else {
            setEstado({ index, value: 'incorrecto' });
        }


        setTimeout(() => {
            setPuesto(prev => ({ index: prev.index + 1, points: valido ? prev.points + 1 : prev.points }));
            if (puesto.index == 10) {
                return setfin(true);
            }
            setEstado({});
            getQuestion();
        }, 1000);
    }
    const iniciar = () => {
        setEstado({});
        setPuesto({ index: 1, points: 0 });
        getQuestion();
        setfin(false);
    }
    return question ? (
        <div className='content'>
            <div className='question'>
                <h1>{puesto.index}. {question.pregunta}</h1>
            </div>
            <div>
                <div className='body'>
                    <div className='text-center'>
                        <img src={fondo} alt="fondo" />
                    </div>
                    <div className='altern'>
                        {
                            question.alternativas.map((x, index) => (
                                <div className={`item ${estado.index == index && estado.value}`} key={index} onClick={() => responder(index, x)}>
                                    <span className='letter'>{letters[index]}</span>
                                    <span className='answer'>{x}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='info'>
                <span>PUNTOS: {puesto.points}</span>
                <span>{puesto.index}/10</span>
            </div>
            {
                fin && (
                    <div className='tab'>
                        <div>
                            <h3>Conseguiste {puesto.points} puntos</h3>
                            <button onClick={() => iniciar()}>Iniciar de nuevo</button>
                        </div>
                    </div>
                )
            }
        </div>
    ) : (
        <div className="content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ color: 'white', fontWeight: 'bold' }}>PREGUNTA N° {puesto.index}</h2>
        </div>
    )
}
