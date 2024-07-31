import {useEffect} from "react";
import {fabric} from "fabric"
let canvas
export default function MainCanvas() {

    useEffect(() => {
        canvas = new fabric.Canvas('canvas', {
            backgroundColor: 'white',
            selectionColor: 'transparent',
            selectionBorderColor:"black",
            selectionLineWidth: 1,
            width: 550,
            height: 400,

        });
        canvas.renderAll()
    }, [])


    function addRectangle(){
        let rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        });
        canvas.add(rect);

    }

    return (
        <>
            <p>Fabric Js Canvas</p>
            <canvas id={"canvas"} style={{border: "black solid 2px"}}></canvas>
            <button onClick={addRectangle}>Click Me</button>

            <div style={{color: "red",}}>
                <p>meow</p>
            </div>

        </>
    )
}