import { Segment } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import "../styles/editor.scss";
import { useBoardCursor, CellCursor } from "../hooks/useBoardCursor";
import { useBoardDisplay } from "../hooks/useBoardDisplay";
import { Dimension } from "../Board";
import { usePlacementHighlight } from "../hooks/useBoardHighlight";

export interface EditorProps {
    board: Dimension,
    selection: CellCursor
};

export const Editor = (props: EditorProps) => {
    const {
        boardWidth,
        boardHeight,
    } = useBoardDisplay(props.board);



    const position = useBoardCursor();
    usePlacementHighlight(position, props.selection.dimension);


    const handleOnClick = () => {
        console.log(position);
        //console.log(props.selection);
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