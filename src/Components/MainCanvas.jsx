import {useEffect, useState} from "react";
import {fabric} from "fabric";
import {useForm} from "react-hook-form";

let canvas;
export default function MainCanvas() {
    const [selectedObj, setSelectedObj] = useState(false);
    const [formData, useFormData] = useState(0)
    // Form States
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        let obj = canvas.getActiveObject();
        debugger

        if (obj) {
            const {left, top, height, width, fill} = data;
            obj.set({
                left: parseInt(left),
                top: parseInt(top),
                height: parseInt(height),
                width: parseInt(width),
                stroke: 5,
                fill: fill,
            });
            canvas.renderAll();
        }
        // addRectangle(data.left, data.top, data.fill, data.width, data.height);
        reset();
    };

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
                setSelectedObj(true);
                console.log("An object was clicked!", options.target.type);
                const activeObject = options.target;
                console.log(activeObject);
                console.log("fill", activeObject.fill);
                console.log("top", activeObject.top);
                console.log("left", activeObject.left);
                console.log("width", activeObject.width);
                console.log("height", activeObject.height);
                console.log("radius", activeObject.radius);
                console.log("stroke", activeObject.stroke);

                if (activeObject) {
                    const { left, top, height, width, fill } = activeObject;
                    activeObject.set({
                        left: parseInt(left),
                        top: parseInt(top),
                        height: parseInt(height),
                        width: parseInt(width),
                        stroke: 5,
                        fill: fill,
                    });
                    canvas.renderAll();
                }
            }
        };

        canvas.on("mouse:down", handleMouseDown);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            canvas.off("mouse:down", handleMouseDown);
        };
    }, []);
    function addRectangle() {
        let rect = new fabric.Rect({
            left: 100 * Math.floor(Math.random() * 6),
            top: 100 * Math.floor(Math.random() * 4),
            fill: 'blue',
            width: 40,
            height: 40,
            stroke: 0,
        });
        canvas.add(rect);
    }

    function addCircle() {
        let circle = new fabric.Circle({
            radius: 20,
            fill: "green",
            left: 100 * Math.floor(Math.random() * 6),
            top: 100 * Math.floor(Math.random() * 4),
        });
        canvas.add(circle);
    }

    function addPath() {
        let path = new fabric.Path("M 0 0 L 100 100 L 70 100 z");
        path.set({
            left: 100 * Math.floor(Math.random() * 5),
            top: 100 * Math.floor(Math.random() * 3),
        });
        canvas.add(path);
    }

    function addText() {
        let underlineText = new fabric.Text("I'm an underlined text", {
            underline: true,
            left: 100 * Math.floor(Math.random() * 5),
            top: 100 * Math.floor(Math.random() * 4),
            fontSize: 20,
        });
        canvas.add(underlineText);
    }

    function addImage() {
        fabric.Image.fromURL("vite.svg", function (oImg) {
            oImg.set({
                left: 100 * Math.floor(Math.random() * 5),
                top: 100 * Math.floor(Math.random() * 4),
            });
            canvas.add(oImg);
        });
    }

    function canvasClear() {
        canvas.clear();
    }

    return (
        <>
            <p className={"border py-4 text-2xl bold flex justify-center items-center"}>
                Fabric Js Canvas Kitchen Sink
            </p>

            <div className={"flex w-[100%] py-3"}>
                <div className="w-[70%] flex justify-center items-center">
                    <canvas id="canvas" style={{border: "black solid 2px"}}></canvas>
                </div>

                <div className={"w-[40%] h-[95%] border flex grow flex-col"}>
                    <div className={"border p-5 h-[80%] w-[80%]"}>
                        {/*{selectedObj && <form onSubmit={handleSubmit(onSubmit)} className={""}>*/}
                        {/*    <input*/}
                        {/*        onChange={() => console.log('changed')}*/}
                        {/*        required={true}*/}
                        {/*        type={"number"}*/}
                        {/*        placeholder={"Height"}*/}
                        {/*        min={1}*/}
                        {/*        max={390}*/}
                        {/*        className={"border py-2 px-[10%] rounded"}*/}
                        {/*        {...register("height")}*/}
                        {/*    />*/}
                        {/*    <br/> <br/>*/}
                        {/*    <input*/}
                        {/*        required={true}*/}
                        {/*        type={"number"}*/}
                        {/*        placeholder={"Width"}*/}
                        {/*        min={1}*/}
                        {/*        max={390}*/}
                        {/*        className={"border py-2 px-[10%] rounded"}*/}
                        {/*        {...register("width")}*/}
                        {/*    />*/}
                        {/*    <br/> <br/>*/}
                        {/*    <input*/}
                        {/*        required={true}*/}
                        {/*        type={"number"}*/}
                        {/*        placeholder={"Top"}*/}
                        {/*        min={0}*/}
                        {/*        max={390}*/}
                        {/*        className={"border py-2 px-[10%] rounded"}*/}
                        {/*        {...register("top")}*/}
                        {/*    />*/}
                        {/*    <br/> <br/>*/}
                        {/*    <input*/}
                        {/*        required={true}*/}
                        {/*        type={"number"}*/}
                        {/*        placeholder={"Left"}*/}
                        {/*        min={0}*/}
                        {/*        max={590}*/}
                        {/*        className={"border py-2 px-[10%] rounded"}*/}
                        {/*        {...register("left")}*/}
                        {/*    />*/}
                        {/*    <input*/}
                        {/*        required={true}*/}
                        {/*        type={"number"}*/}
                        {/*        placeholder={"Stroke Width"}*/}
                        {/*        min={0}*/}
                        {/*        max={10}*/}
                        {/*        className={"border py-2 px-[10%] rounded"}*/}
                        {/*        {...register("stroke")}*/}
                        {/*    />*/}
                        {/*    <br/>*/}
                        {/*    <br/>*/}
                        {/*    <div className="relative inline-block">*/}
                        {/*        <input*/}
                        {/*            type="color"*/}
                        {/*            id="colorPicker"*/}
                        {/*            {...register("fill")}*/}
                        {/*            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"*/}
                        {/*        />*/}
                        {/*        <label*/}
                        {/*            htmlFor="colorPicker"*/}
                        {/*            className="border py-2 px-4 rounded cursor-pointer"*/}
                        {/*        >*/}
                        {/*            Change Color*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*    <br/>*/}

                        {/*    <input className={"border rounded py-2 px-8 m-2"} type="submit"/>*/}
                        {/*</form>}*/}
                        <div>
                            <input type={"number"} placeholder={'Height'} min={0} max={390}/>
                            <input type={"number"} placeholder={'width'} min={0} max={390}/>
                            <input type={"number"} placeholder={'top'} min={0} max={390}/>
                            <input type={"number"} placeholder={'left'} min={0} max={390}/>
                        </div>
                    </div>
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


// import {useEffect, useState} from "react";
// import {fabric} from "fabric";
// import {useForm} from "react-hook-form";
//
// let canvas;
// export default function MainCanvas() {
//     const [selectedObj, setSelectedObj] = useState(false);
//
//     // Form States
//     const {
//         register,
//         handleSubmit,
//         watch,
//         reset,
//         formState: {errors},
//     } = useForm();
//
//     const onSubmit = (data) => {
//         console.log(data);
//         let obj = canvas.getActiveObject();
//         debugger
//
//         if (obj) {
//             const {left, top, height, width, fill} = data;
//             obj.set({
//                 left: parseInt(left),
//                 top: parseInt(top),
//                 height: parseInt(height),
//                 width: parseInt(width),
//                 stroke: 5,
//                 fill: fill,
//             });
//             canvas.renderAll();
//         }
//         // addRectangle(data.left, data.top, data.fill, data.width, data.height);
//         reset();
//     };
//
//     useEffect(() => {
//         canvas = new fabric.Canvas("canvas", {
//             backgroundColor: "white",
//             selectionColor: "transparent",
//             selectionBorderColor: "black",
//             selectionLineWidth: 1,
//             width: 600,
//             height: 400,
//         });
//
//         const handleMouseDown = (options) => {
//
//
//             if (options.target) {
//                 // setSelectedObj(prevState => !prevState);
//                 setSelectedObj(true)
//                 console.log("An object was clicked!", options.target.type);
//                 const activeObject = options.target;
//                 console.log(activeObject)
//                 console.log("fill", activeObject.fill);
//                 console.log("top", activeObject.top);
//                 console.log("left", activeObject.left);
//                 console.log("width", activeObject.width);
//                 console.log("height", activeObject.height);
//                 console.log("radius", activeObject.radius);
//                 console.log("stroke", activeObject.stroke);
//
//             }
//         };
//
//         canvas.on("mouse:down", handleMouseDown);
//
//         // return () => {
//         //     canvas.off("mouse:down", handleMouseDown);
//         // };
//     }, []);
//
//     function addRectangle() {
//         let rect = new fabric.Rect({
//             left: 100 * Math.floor(Math.random() * 6),
//             top: 100 * Math.floor(Math.random() * 4),
//             fill: 'blue',
//             width: 40,
//             height: 40,
//             stroke: 0,
//         });
//         canvas.add(rect);
//     }
//
//     function addCircle() {
//         let circle = new fabric.Circle({
//             radius: 20,
//             fill: "green",
//             left: 100 * Math.floor(Math.random() * 6),
//             top: 100 * Math.floor(Math.random() * 4),
//         });
//         canvas.add(circle);
//     }
//
//     function addPath() {
//         let path = new fabric.Path("M 0 0 L 100 100 L 70 100 z");
//         path.set({
//             left: 100 * Math.floor(Math.random() * 5),
//             top: 100 * Math.floor(Math.random() * 3),
//         });
//         canvas.add(path);
//     }
//
//     function addText() {
//         let underlineText = new fabric.Text("I'm an underlined text", {
//             underline: true,
//             left: 100 * Math.floor(Math.random() * 5),
//             top: 100 * Math.floor(Math.random() * 4),
//             fontSize: 20,
//         });
//         canvas.add(underlineText);
//     }
//
//     function addImage() {
//         fabric.Image.fromURL("vite.svg", function (oImg) {
//             oImg.set({
//                 left: 100 * Math.floor(Math.random() * 5),
//                 top: 100 * Math.floor(Math.random() * 4),
//             });
//             canvas.add(oImg);
//         });
//     }
//
//     function canvasClear() {
//         canvas.clear();
//     }
//
//     return (
//         <>
//             <p className={"border py-4 text-2xl bold flex justify-center items-center"}>
//                 Fabric Js Canvas Kitchen Sink
//             </p>
//
//             <div className={"flex w-[100%] py-3"}>
//                 <div className="w-[70%] flex justify-center items-center">
//                     <canvas id="canvas" style={{border: "black solid 2px"}}></canvas>
//                 </div>
//
//                 <div className={"w-[40%] h-[95%] border flex grow flex-col"}>
//                     <div className={"border p-5 h-[80%] w-[80%]"}>
//                         {selectedObj && <form onSubmit={handleSubmit(onSubmit)} className={""}>
//                             <input
//                                 onChange={() => console.log('changed')}
//                                 required={true}
//                                 type={"number"}
//                                 placeholder={"Height"}
//                                 min={1}
//                                 max={390}
//                                 className={"border py-2 px-[10%] rounded"}
//                                 {...register("height")}
//                             />
//                             <br/> <br/>
//                             <input
//                                 required={true}
//                                 type={"number"}
//                                 placeholder={"Width"}
//                                 min={1}
//                                 max={390}
//                                 className={"border py-2 px-[10%] rounded"}
//                                 {...register("width")}
//                             />
//                             <br/> <br/>
//                             <input
//                                 required={true}
//                                 type={"number"}
//                                 placeholder={"Top"}
//                                 min={0}
//                                 max={390}
//                                 className={"border py-2 px-[10%] rounded"}
//                                 {...register("top")}
//                             />
//                             <br/> <br/>
//                             <input
//                                 required={true}
//                                 type={"number"}
//                                 placeholder={"Left"}
//                                 min={0}
//                                 max={590}
//                                 className={"border py-2 px-[10%] rounded"}
//                                 {...register("left")}
//                             />
//                             <input
//                                 required={true}
//                                 type={"number"}
//                                 placeholder={"Stroke Width"}
//                                 min={0}
//                                 max={10}
//                                 className={"border py-2 px-[10%] rounded"}
//                                 {...register("stroke")}
//                             />
//                             <br/>
//                             <br/>
//                             <div className="relative inline-block">
//                                 <input
//                                     type="color"
//                                     id="colorPicker"
//                                     {...register("fill")}
//                                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                 />
//                                 <label
//                                     htmlFor="colorPicker"
//                                     className="border py-2 px-4 rounded cursor-pointer"
//                                 >
//                                     Change Color
//                                 </label>
//                             </div>
//                             <br/>
//
//                             <input className={"border rounded py-2 px-8 m-2"} type="submit"/>
//                         </form>
//                         }
//                     </div>
//                 </div>
//             </div>
//
//             <div className={"border my-2 py-2 px-4"}>
//                 <div className={"flex "}>
//                     <button className={"border rounded py-2 px-4 m-2"} onClick={addRectangle}>
//                         Add Rectangle
//                     </button>
//                     <button className={"border rounded py-2 px-4 m-2"} onClick={addCircle}>
//                         Add Circle
//                     </button>
//                     <button className={"border rounded py-2 px-4 m-2"} onClick={addImage}>
//                         Add Image
//                     </button>
//                     <button className={"border rounded py-2 px-4 m-2"} onClick={addPath}>
//                         Add Path
//                     </button>
//                     <button className={"border rounded py-2 px-4 m-2"} onClick={addText}>
//                         Add Text
//                     </button>
//                 </div>
//
//                 <div className={"flex flex-row-reverse"}>
//                     <button className={"border rounded py-2 px-4 m-2 bg-red"} onClick={canvasClear}>
//                         Clear Canvas
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }
