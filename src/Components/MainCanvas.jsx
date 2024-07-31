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

    function addCircle()
    {
        let circle = new fabric.Circle({
            radius: 20,
            fill: 'green',
            left: 100,
            top: 100
        });
        canvas.add(circle)
    }

    function addPath()
    {
        let path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
        path.set({
            left: 120,
            top: 120
        });

        canvas.add(path)
    }

    return (
        <>
            <p>Fabric Js Canvas</p>
            <canvas id={"canvas"} style={{border: "black solid 2px"}}></canvas>
            <div className={"flex border m-2"}>
                <button onClick={addRectangle}>Add Rectangle</button>
                <button onClick={addCircle}>Add Circle</button>
                <button onClick={addRectangle}>Add Image</button>
                <button onClick={addPath}>Add Path</button>
                <button onClick={addRectangle}>Add Text</button>
            </div>


            <div style={{color: "red",}}>
                <p>meow</p>
            </div>

        </>
    )
}