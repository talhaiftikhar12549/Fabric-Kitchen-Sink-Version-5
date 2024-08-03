import {useEffect, useState} from "react";
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
    const [objName, setObjName] = useState();
    const [selectedObj, setSelectedObj] = useState(null);

    //Canvas define Start
    useEffect(() => {
        canvas = new fabric.Canvas("canvas", {
            backgroundColor: "white",
            selectionColor: "transparent",
            selectionBorderColor: "black",
            selectionLineWidth: 1,
            width: 600,
            height: 400,
        });
            window.canvas

        const handleMouseDown = (options) => {
            if (options.target) {
                console.log(options.target)
                console.log(options.target.type)
                setObjName(options.target.type)
                setSelectedObj(options.target);
                const activeObject = options.target;
                setLeft(activeObject.left);
                // setHeight(activeObject.height * activeObject.scaleY);
                setHeight(activeObject.scaleY)
                setTop(activeObject.top);
                // setWidth(activeObject.width * activeObject.scaleX);
                setWidth(activeObject.scaleX)
                setRadius(activeObject.radius)
                setStroke(activeObject.stroke)
                setFill(activeObject.fill)
            }
        };

        const handleSelectionCleared = () => {
            setSelectedObj(null);
        };

        canvas.on("mouse:down", handleMouseDown );
        canvas.on("object:moving", handleMouseDown );
        canvas.on("object:modified", handleMouseDown );
        canvas.on("selection:cleared", handleSelectionCleared);

        return () => {
            canvas.off("mouse:down", handleMouseDown);
            canvas.off("object:moving", handleMouseDown);
            canvas.off("object:modified", handleMouseDown);
            canvas.off("selection:cleared", handleSelectionCleared);
        };
    }, []);
    //Canvas define Ends
    // Changing Value of Selected Object Start
    useEffect(() => {
        if (selectedObj) {
            selectedObj.set({
                left: parseInt(left),
                top: parseInt(top), // height: parseInt(height) / selectedObj.scaleY,
                // width: parseInt(width) / selectedObj.scaleX,
                scaleX: parseInt(width),
                scaleY: parseInt(height),
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
        if (name === "stroke") {
            if (value === true) {
                setStroke(0);
            } else if (value === false) {
                setStroke(1);
            }

        }

        if (name === "fill") setFill(value);

    };
    //  Changing Value of Selected Object Ends
    //    Adding Shapes on Canvas Start
    const addRectangle = () => {
        let rect = new fabric.Rect({
            left: 100 * Math.floor(Math.random() * 6),
            top: 100 * Math.floor(Math.random() * 4),
            fill: 'blue',
            width: 80,
            height: 40,
            scaleX: 1,
            ScaleY: 1,
            stroke: 0,

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
            scaleX: 1,
            scaleY: 1,
            stroke: 0,
        });
        canvas.add(path);
    };

    const addText = () => {
        let underlineText = new fabric.Textbox("Blind Sniper 053", {
            underline: true,
            left: 100 * Math.floor(Math.random() * 5),
            top: 100 * Math.floor(Math.random() * 4),
            fontSize: 20,
            scaleX: 1,
            scaleY: 1,
            stroke: 0,
        });
        canvas.add(underlineText);
    };

    const addImage = () => {
        fabric.Image.fromURL("vite.svg", function (oImg) {
            oImg.set({
                left: 100 * Math.floor(Math.random() * 5),
                top: 100 * Math.floor(Math.random() * 4),
                scaleX: 1,
                scaleY: 1,
            });
            canvas.add(oImg);
        });
    };

    const canvasClear = () => {
        canvas.clear();
    };
//    Adding Shapes on Canvas Ends
    return (<>
        {/*Header Start*/}
        <p className={"border  py-4 text-3xl  extra-bold flex justify-center items-center shadow-md"}>
            Fabric Js Canvas Kitchen Sink
        </p>
        {/*Header Ends*/}
        {/*Canvas Adn Form Start*/}
        <div className={"flex w-[100%] py-3"}>
            <div className="w-[70%] flex justify-center items-center">
                <canvas className={"shadow-md"} id="canvas" style={{border: "black solid 2px"}}></canvas>
            </div>
            <div className={"w-[40%] h-[95%] flex "}>
                {selectedObj &&

                    <div className={"border p-5 h-[80%] w-[80%] shadow-lg"}>
                        <div>
                            <label>Height&nbsp;</label>
                            <input
                                className={"border my-2 py-2 px-[10%] rounded"}
                                onChange={handleChange}
                                type={"number"}
                                name="height"
                                value={height}
                                placeholder={'Height'}
                                min={0}
                                max={380}
                            /><br/>
                            <label>Width&nbsp;</label>
                            <input
                                className={"border my-2 py-2 px-[10%] rounded"}
                                onChange={handleChange}
                                type={"number"}
                                name="width"
                                value={width}
                                placeholder={'Width'}
                                min={0}
                                max={585}
                            /><br/>
                            <label>Top&nbsp;</label>
                            <input
                                className={"border my-2 py-2 px-[10%] rounded"}
                                onChange={handleChange}
                                type={"number"}
                                name="top"
                                value={top}
                                placeholder={'Top'}
                                min={0}
                                max={385}
                            /><br/>
                            <label>Left&nbsp;</label>
                            <input
                                className={"border my-2 py-2 px-[10%] rounded"}
                                onChange={handleChange}
                                type={"number"}
                                name="left"
                                value={left}
                                placeholder={'Left'}
                                min={0}
                                max={585}
                            /><br/>
                            {objName === "circle" && (
                                <>
                                    <label>Radius&nbsp;</label>
                                    <input
                                        className={"border my-2 py-2 px-[10%] rounded"}
                                        onChange={handleChange}
                                        type={"number"}
                                        name="radius"
                                        value={radius}
                                        placeholder={'radius'}
                                        min={0}
                                        max={50}
                                    />
                                    <br/>
                                </>
                            )}
                            {objName !== "image" && (
                                <>
                                    <label>Color &nbsp;</label>
                                    <button onClick={() => {
                                        document.getElementById('colorInput').click();
                                    }} className={"border py-2 px-[10%] my-2"}>Pick Color
                                    </button>
                                    <input
                                        className={"border py-2 px-[10%]  rounded opacity-0"}
                                        type={"color"}
                                        name="fill"
                                        onChange={handleChange}
                                        value={fill}
                                        placeholder={'color'}
                                        id="colorInput"
                                    /><br/>
                                </>
                            )
                            }
                        </div>
                    </div>

                }
            </div>
        </div>
        {/*Canvas And Form Ends*/}
        {/*Buttons Bar Start*/}
        <div className={"border my-1 py-[10px] px-4"}>
            <div className={"flex "}>
                <button className={"border text-white bg-blue-600 font-semibold rounded py-2 px-4 m-2"}
                        onClick={addRectangle}>
                    Add Rectangle
                </button>
                <button className={"border text-white bg-blue-600 font-semibold rounded py-2 px-4 m-2"}
                        onClick={addCircle}>
                    Add Circle
                </button>
                <button className={"border text-white bg-blue-600 font-semibold rounded py-2 px-4 m-2"}
                        onClick={addImage}>
                    Add Image
                </button>
                <button className={"border text-white bg-blue-600 font-semibold rounded py-2 px-4 m-2"}
                        onClick={addPath}>
                    Add Path
                </button>
                <button className={"border text-white bg-blue-600 font-semibold rounded py-2 px-4 m-2"}
                        onClick={addText}>
                    Add Text
                </button>
            </div>

            <div className={"flex flex-row-reverse"}>
                <button className={"border font-semibold bg-red-600 text-white rounded py-2 px-4 m-2 "}
                        onClick={canvasClear}>
                    Clear Canvas
                </button>
            </div>

        </div>
        {/*Buttons Bar Ends*/}
    </>);
}