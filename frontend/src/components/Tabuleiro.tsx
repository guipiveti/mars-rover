import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import Table from 'react-bootstrap/Table';

type TabuleiroProps = {
    currentX: number,
    currentY: number,
    currentDirection: string,
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
                            case 'N':
                                return <td key={x}><AiOutlineArrowUp /></td>
                            case 'E':
                                return <td key={x}><AiOutlineArrowRight /></td>
                            case 'S':
                                return <td key={x}><AiOutlineArrowDown /></td>
                            case 'W':
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