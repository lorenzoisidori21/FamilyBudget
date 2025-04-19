import { Button } from "flowbite-react";

interface SampleComponentProps{
    title: string;
}

export default function SampleComponent(props : SampleComponentProps){

    return(
        <div className="m-auto flex">
            <Button className="w-44 m-auto">{props.title}</Button>
        </div>
    )
}