import React, { useEffect, useState, useRef } from 'react'
import img from '../image.jpg';
import sound from '../audio.wav';
//1 2 3    1 2 3              1        2       3          1              3
//4 5 6         4 5 6         4        5       6            5          5 
//7 8 9              7 8 9    7        8       9              9      7
const Game = () => {

    const array = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

    const [turn, setturn] = useState(0);
    const [winner, setwinner] = useState('');
    const [box, setBox] = useState(array);
    const [active, setactive] = useState(true);
    console.log('value of active', active);

    const audio = new Audio(sound);
    const handleClick = (e) => {
        e.target.classList.add("visible");
        const curdata = e.target.innerText;
        audio.play();
        const current = turn == 0 ? e.target.innerText = 'X' : e.target.innerText = 'O'
        const boxdata = [...box];
        boxdata[curdata] = current;
        setBox(boxdata);
        setturn(turn === 0 ? 1 : 0);
    }

    useEffect(() => {
        setactive(true);
    }, [handleClick])
    const resetBoard = () => {
        setBox(['0', '1', '2', '3', '4', '5', '6', '7', '8']);
        setturn(0);
        setwinner('');

        setactive(false);
    }
    useEffect(() => {
        const checkRow = () => {
            let ans = false;
            for (var i = 0; i <= 2; i++) {
                for (var j = 0; j <= 2; j++) {
                    if (box[0] === box[1] && box[1] === box[2] && box[2] === box[0] ||
                        box[3] === box[4] && box[4] === box[5] && box[5] === box[3] ||
                        box[6] === box[7] && box[7] === box[8] && box[8] === box[6]) {
                        return ans = true;
                    }
                    else {
                        return ans = false;


                    }
                }
            }
        }
        const checkColumn = () => {
            let ans = false;
            for (var i = 0; i <= 2; i++) {
                for (var j = 0; j <= 2; j++) {
                    if (box[0] === box[3] && box[3] === box[6] && box[6] === box[0] ||
                        box[1] === box[4] && box[4] === box[7] && box[7] === box[1] ||
                        box[2] === box[5] && box[5] === box[8] && box[8] === box[2]) {
                        return ans = true;
                    }
                    else {
                        return ans = false;


                    }
                }
            }
        }
         const checkDigonal = () => {
            let ans = false;
            for (var i = 0; i <= 2; i++) {
                for (var j = 0; j <= 2; j++) {
                   if (box[0] === box[4] && box[4] === box[8] && box[8] === box[0] ||
                        box[2] === box[4] && box[4] === box[6] && box[6] === box[2]) {
                        return ans = true;
                    }
                    else {
                        return ans = false;
                    }
                }
            }
        }
        const checkWin = () => {
            return (checkRow() || checkColumn()||checkDigonal());
        }
        if (checkWin()) {
            setwinner(turn === 0 ? "Player 2 Wins!" : "Player 1 Wins!");
        }
    })

    return (
        <>
            <div className='wrapper' style={{ 'background': `url(${img})` }} >

                {winner &&
                    <div className='modal_wrapper'>
                        <div className='cus_modal'>
                            {winner}
                            <center>
                                <button className='reset_btn' onClick={() => resetBoard()}><i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </center>
                        </div>
                    </div>}
                <div className='box'>
                    {
                        box.map((box) => (
                            <span className={active ? 'box_element' : 'box_element '}
                                onClick={handleClick}>
                                {box}
                            </span>
                        ))}
                </div>
            </div>

            <center>
                <button className='reset_btn' onClick={() => resetBoard()}><i class="fa fa-refresh" aria-hidden="true"></i>
                </button>
            </center>
        </>
    )
}

export default Game
