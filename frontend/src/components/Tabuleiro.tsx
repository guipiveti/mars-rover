import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import Table from 'react-bootstrap/Table';

type TabuleiroProps = {
    currentX: number,
    currentY: number,
    currentDirection: number,
    fieldSizeX: number,
    fieldSizeY: number
 };

function Tabuleiro(props: TabuleiroProps): JSX.Element {

    const RowTabuleiro = (y: number): JSX.Element => {
        return (
            <tr key={y}>
                {[...Array(props?.fieldSizeX).keys()].map((x) => {
                    if (y === props.currentY && x === props.currentX) {
                        switch (props?.currentDirection) {
                            case 0:
                                return <td key={x}><AiOutlineArrowUp /></td>
                            case 1:
                                return <td key={x}><AiOutlineArrowRight /></td>
                            case 2:
                                return <td key={x}><AiOutlineArrowDown /></td>
                            case 3:
                                return <td key={x}><AiOutlineArrowLeft /></td>
                            default:
                                return <td key={x}>X</td>
                        }
                    } else {
                        return <td key={x}>&nbsp;</td>
                    }
                })
                }
            </tr>
        );
    }

    return (
        <Table striped bordered>
            <tbody>
                {[...Array(props?.fieldSizeY).keys()].reverse().map((y) => { return RowTabuleiro(y) })}
            </tbody>
        </Table>

    );
}

export default Tabuleiro;