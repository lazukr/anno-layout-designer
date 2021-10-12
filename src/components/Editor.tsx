import { Segment } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import "../styles/editor.scss";
import { useBoardCursor } from "../hooks/useBoardCursor";
import { useBoardDisplay } from "../hooks/useBoardDisplay";
import { Board, useBoard } from "../hooks/useBoard";

export const Editor = (props: Board) => {
    const {
        boardWidth,
        boardHeight,
    } = useBoardDisplay(props);
    const cell = useBoardCursor();
    const board = useBoard({
        width: boardWidth,
        height: boardHeight,
    });

    const handleOnClick = () => {
        console.log(cell);
    };

    return (
        <Segment 
            basic
            style={{
                overflow:"auto", 
                maxWidth:"90wh", 
                maxHeight:"80vh"
            }}
        >
            <svg 
                id="snap" 
                width={boardWidth}
                height={boardHeight}
                onClick={handleOnClick}
            />
        </Segment>
    );
};