'use client'

import React, { ReactNode } from "react";
import { SigMfCaptureType, SigMfAnnotationType } from "./SigMfInterfaces";
import { AiOutlineClose } from "react-icons/ai";

export default function SigMfArrayDisplay( { inData, inIdx, typeStr, deleterFunction }: { inData: SigMfCaptureType|SigMfAnnotationType, inIdx: number, typeStr: string, deleterFunction: Function }) {

    const data = inData;
    const idx = inIdx;

    function raiseDeleteEvent() {
        deleterFunction(idx);
    }

    function createObjectList(obj: object) {
        console.log(obj);
        const tmp = [];
        Object.keys(obj).map(key => {
            console.log(key);
            if (typeof data[obj as keyof typeof obj] === 'object') {
                return createObjectList(obj[key as keyof typeof obj] as object);
            } else {
                console.log("here");
                /*
                const tmpArr = Object.keys(obj[key as keyof typeof obj] as object).map(subkey => {
                    console.log("subkey:" + subkey);
                    return (
                        <li key={`${key}-${subkey}-key`}><em>{key}:{subkey}</em>{obj[key as keyof typeof obj][subkey] as ReactNode}</li>
                    );
                });
                console.log(tmpArr);
                return tmpArr;
                */
               /*
                return (
                    <li key={`${key}-key`}><em>{key}</em>: {obj[key as keyof typeof obj] as ReactNode}</li>
                );
                */
               tmp.push(<li key={`${key}-key`}><em>{key}</em>: {obj[key as keyof typeof obj] as ReactNode}</li>);
            }
            console.log(tmp);
            return tmp;
        });
    }

    return (
        <div className="bg-slate-400 dark:hover:bg-slate-600 dark:text-stone-100 dark:hover:text-white cursor-pointer rounded-md mx-4 items-center p-4 first:mt-2 grid grid-cols-10">
            <p className="overflow-auto col-span-3 flex justify-start"><strong>{typeStr} {idx}</strong></p>
            <div className="grid grid-cols-1 col-span-6">
                <ul className="overflow-auto">
                    {Object.keys(data).map(key => {
                        if (typeof data[key as keyof typeof data] === 'object') { /*
                            const tmpArr = Object.keys(data[key as keyof typeof data]).map(subkey => {
                                return (
                                    <li key={`${key}-${subkey}-key`}><em>{key}:{subkey}</em> {data[key as keyof typeof data][subkey] as ReactNode}</li>
                                )
                            });

                            return tmpArr; */
                            //return createObjectList(data[key]) as ReactNode;
                            //const whatevs = createObjectList(data[key]);
                            //console.log(whatevs);
                            return createObjectList(data[key]) as ReactNode;
                        } else {
                            return (
                                <li key={`${key}-key`}><em>{key}</em>: {data[key as keyof typeof data] as ReactNode}</li>
                            )
                        }
                    })}
                </ul>
            </div>
            <div className="flex justify-end">
                <AiOutlineClose className="fill-rose-500 dark:fill-rose-300 hover:fill-rose-600 hover:bg-slate-500 rounded-md" onClick={raiseDeleteEvent} />
            </div>
        </div>
    );
}