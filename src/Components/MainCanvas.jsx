import {useEffect, useState, useRef} from "react";
import {fabric} from "fabric";

let canvas;

export default function MainCanvas() {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [radius, setRadius] = useState(0);
    const [stroke, setStroke] = useState(0);
    const [fill, setFill] = useState();
    const [selectedObj, setSelectedObj] = useState(null);

    const colorInputRef = useRef(null);

    useEffect(() => {
        canvas = new fabric.Canvas("canvas", {
            backgroundColor: "white",
            selectionColor: "transparent",
            selectionBorderColor: "black",
            selectionLineWidth: 1,
            width: 600,
            height: 400,
        });

        const handleMouseDown = (options) => {
            if (options.target) {
                console.log(options.target)
                setSelectedObj(options.target);
                const activeObject = options.target;
                setLeft(activeObject.left);
                setHeight(activeObject.height * activeObject.scaleY);
                setTop(activeObject.top);
                setWidth(activeObject.width * activeObject.scaleX);
                setRadius(activeObject.radius)
                setStroke(activeObject.stroke)
                setFill(activeObject.fill)
            }
        };

        const handleSelectionCleared = () => {
            setSelectedObj(null);
        };

        canvas.on("mouse:down", handleMouseDown);
        canvas.on("selection:cleared", handleSelectionCleared);

        return () => {
            canvas.off("mouse:down", handleMouseDown);
            canvas.off("selection:cleared", handleSelectionCleared);
        };
    }, []);

    useEffect(() => {
        if (selectedObj) {
            selectedObj.set({
                left: parseInt(left),
                top: parseInt(top),
                height: parseInt(height) / selectedObj.scaleY,
                width: parseInt(width) / selectedObj.scaleX,
                radius: parseInt(radius),
                stroke: parseInt(stroke),
                fill: fill,

            });
            canvas.renderAll();
        }
    }, [left, top, height, width, radius, fill, stroke, selectedObj]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "width") setWidth(value);
        if (name === "height") setHeight(value);
        if (name === "top") setTop(value);
        if (name === "left") setLeft(value);
        if (name === "radius") setRadius(value);
        if (name === "stroke")
        {
            if (value === true) {
                setStroke(0);
            } else if (value === false) {
                setStroke(1);
            }

        };
        if (name === "fill") setFill(value);

    };

    const addRectangle = () => {
        let rect = new fabric.Rect({
            left: 100 * Math.floor(Math.random() * 6),
            top: 100 * Math.floor(Math.random() * 4),
            fill: 'blue',
            width: 40,
            height: 40,
            stroke: 0,
            setScale(sx, sy) {
            }

        });
        canvas.add(rect);
    };

    const addCircle = () => {
        let circle = new fabric.Circle({
            radius: 20,
            fill: "green",
            left: 100 * Math.floor(Math.random() * 6),
            top: 100 * Math.floor(Math.random() * 4),
            stroke: 0,
        });
        canvas.add(circle);
    };

    const addPath = () => {
        let path = new fabric.Path("M 0 0 L 100 100 L 70 100 z");
        path.set({
            left: 100 * Math.floor(Math.random() * 5),
            top: 100 * Math.floor(Math.random() * 3),
            stroke: 0,
        });
        canvas.add(path);
    };

    const addText = () => {
        let underlineText = new fabric.Text("I'm an underlined text", {
            underline: true,
            left: 100 * Math.floor(Math.random() * 5),
            top: 100 * Math.floor(Math.random() * 4),
            fontSize: 20,
            stroke: 0,
        });
        canvas.add(underlineText);
    };

    const addImage = () => {
        fabric.Image.fromURL("vite.svg", function (oImg) {
            oImg.set({
                left: 100 * Math.floor(Math.random() * 5),
                top: 100 * Math.floor(Math.random() * 4),
            });
            canvas.add(oImg);
        });
    };

    const canvasClear = () => {
        canvas.clear();
    };

    return (
        <>
            <p className={"border py-4 text-2xl bold flex justify-center items-center"}>
                Fabric Js Canvas Kitchen Sink
            </p>

            <div className={"flex w-[100%] py-3"}>
                <div className="w-[70%] flex justify-center items-center">
                    <canvas id="canvas" style={{border: "black solid 2px"}}></canvas>
                </div>
                <div className={"w-[40%] h-[95%] flex "}>
                {selectedObj &&

                        <div className={"border p-5 h-[80%] w-[80%]"}>
                            <div>
                                <label>Height</label>
                                <input
                                    className={"border py-2 px-[10%] rounded"}
                                    onChange={handleChange}
                                    type={"number"}
                                    name="height"
                                    value={height}
                                    placeholder={'Height'}
                                    min={0}
                                    max={380}
                                /><br/>
                                <label>Width</label>
                                <input
                                    className={"border py-2 px-[10%] rounded"}
                                    onChange={handleChange}
                                    type={"number"}
                                    name="width"
                                    value={width}
                                    placeholder={'Width'}
                                    min={0}
                                    max={585}
                                /><br/>
                                <label>Top</label>
                                <input
                                    className={"border py-2 px-[10%] rounded"}
                                    onChange={handleChange}
                                    type={"number"}
                                    name="top"
                                    value={top}
                                    placeholder={'Top'}
                                    min={0}
                                    max={385}
                                /><br/>
                                <label>Left</label>
                                <input
                                    className={"border py-2 px-[10%] rounded"}
                                    onChange={handleChange}
                                    type={"number"}
                                    name="left"
                                    value={left}
                                    placeholder={'Left'}
                                    min={0}
                                    max={585}
                                /><br/>
                                <label>Radius</label>
                                <input
                                    className={"border py-2 px-[10%] rounded"}
                                    onChange={handleChange}
                                    type={"number"}
                                    name="radius"
                                    value={radius}
                                    placeholder={'radius'}
                                    min={0}
                                    max={50}
                                /><br/>
                                {/*<label>Stroke</label>*/}
                                {/*<input*/}
                                {/*    className={"border py-2 px-[10%] rounded"}*/}
                                {/*    onChange={handleChange}*/}
                                {/*    type={"checkbox"}*/}
                                {/*    name="stroke"*/}
                                {/*    value={stroke}*/}
                                {/*    placeholder={'stroke'}*/}
                                {/*    min={0}*/}
                                {/*    max={50}*/}
                                {/*/>*/}
                                {/*<br/>*/}
                                <label>Color</label>
                                <button onClick={() => {
                                    document.getElementById('colorInput').click();
                                }} className={"border"}>Pick Color
                                </button>
                                <input
                                    className={"border py-2 px-[10%] rounded opacity-0"}
                                    type={"color"}
                                    name="fill"
                                    onChange={handleChange}
                                    value={fill}
                                    placeholder={'color'}
                                    id="colorInput"
                                /><br/>
                            </div>
                        </div>

                }
                </div>
            </div>

            <div className={"border my-2 py-2 px-4"}>
                <div className={"flex "}>
                    <button className={"border rounded py-2 px-4 m-2"} onClick={addRectangle}>
                        Add Rectangle
                    </button>
                    <button className={"border rounded py-2 px-4 m-2"} onClick={addCircle}>
                        Add Circle
                    </button>
                    <button className={"border rounded py-2 px-4 m-2"} onClick={addImage}>
                        Add Image
                    </button>
                    <button className={"border rounded py-2 px-4 m-2"} onClick={addPath}>
                        Add Path
                    </button>
                    <button className={"border rounded py-2 px-4 m-2"} onClick={addText}>
                        Add Text
                    </button>
                </div>

                <div className={"flex flex-row-reverse"}>
                    <button className={"border rounded py-2 px-4 m-2 bg-red"} onClick={canvasClear}>
                        Clear Canvas
                    </button>
                </div>
            </div>
        </>
    );
}