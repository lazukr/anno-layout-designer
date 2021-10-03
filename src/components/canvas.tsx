import React, { useRef, useEffect } from 'react';

export interface CanvasProps {
    width: number;
    height: number;
}

const SIZE = 20;

export const Canvas = (props: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const width = props.width * SIZE + 1;
    const height = props.height * SIZE + 1;
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        context!.fillStyle = 'white';
        context!.fillRect(0, 0, canvas!.width, canvas!.height);

        for (let x = 0; x < canvas!.width; x += SIZE) {
            context?.moveTo(0.5 + x, 0);
            context?.lineTo(0.5 + x, canvas!.height);
        }

        for (let y = 0; y < canvas!.height; y += SIZE) {
            context?.moveTo(0, 0.5 + y);
            context?.lineTo(canvas!.width, 0.5 + y);
        }

        context!.strokeStyle = 'black';
        context?.stroke();  
    });

    return <canvas ref={canvasRef} width={width} height={height}/>
}