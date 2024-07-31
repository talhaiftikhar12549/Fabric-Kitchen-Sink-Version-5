import {useEffect} from "react";
import {fabric} from "fabric"

let canvas
export default function MainCanvas() {

    useEffect(() => {
        canvas = new fabric.Canvas('canvas', {
            backgroundColor: 'white',
            selectionColor: 'transparent',
            selectionBorderColor: "black",
            selectionLineWidth: 1,
            width: 550,
            height: 400,

        });
        canvas.renderAll()
    }, [])

    let rectl = 50;

    function addRectangle() {
        let rect = new fabric.Rect({
            // left: 100 * Math.floor(Math.random() * 4),
            // top: 100 * Math.floor(Math.random() * 4),
            left: rectl,
            top: rectl,


            fill: 'red',
            width: 20,
            height: 20
        });
        canvas.add(rect);

    }

    function addCircle() {
        let circle = new fabric.Circle({
            radius: 20,
            fill: 'green',
            left: 100 * Math.floor(Math.random() * 4),
            top: 100 * Math.floor(Math.random() * 4)
        });
        canvas.add(circle)
    }

    function addPath() {
        let path = new fabric.Path('M 0 0 L 100 100 L 70 100 z');
        path.set({
            left: 100 * Math.floor(Math.random() * 3),
            top: 100 * Math.floor(Math.random() * 3)
        });

        canvas.add(path)
    }

    function addText() {
        let underlineText = new fabric.Text("I'm an underlined text", {
            underline: true,
            left: 100 * Math.floor(Math.random() * 3),
            top: 100 * Math.floor(Math.random() * 3)
        });

        canvas.add(underlineText)
    }

    function addImage() {
        fabric.Image.fromURL('vite.svg', function (oImg) {
            oImg.set({
                left: 100 * Math.floor(Math.random() * 3),
                top: 100 * Math.floor(Math.random() * 3)
            });
            canvas.add(oImg);
        });
    }


    function canvasClear() {
        canvas.clear()
    }

    return (
        <>

            <p className={"border py-4 text-2xl bold flex justify-center items-center"}>Fabric Js Canvas Kitchen
                Sink</p>


            <div className={"flex w-[100%] py-3"}>
                <div className="w-[70%] flex justify-center items-center">
                    <canvas id="canvas" style={{border: "black solid 2px"}}></canvas>
                </div>

                <div className={"w-[40%]"}>

                </div>
            </div>

            <div className={"border my-2 py-2"}>
                <div className={"flex "}>

                    <button className={"border rounded py-2 px-4 m-2"} onClick={addRectangle}>Add Rectangle</button>
                    <button className={"border rounded  py-2 px-4 m-2"} onClick={addCircle}>Add Circle</button>
                    <button className={"border rounded  py-2 px-4 m-2"} onClick={addImage}>Add Image</button>
                    <button className={"border rounded  py-2 px-4 m-2"} onClick={addPath}>Add Path</button>
                    <button className={"border rounded  py-2 px-4 m-2"} onClick={addText}>Add Text</button>

                </div>
                <div className={"flex flex-row-reverse"}>
                    <button className={"border rounded py-2 px-4 m-2"} onClick={canvasClear}>Clear Canvas</button>
                </div>
            </div>


        </>
    )
}