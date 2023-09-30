import {useEffect, useState} from "react";

export default function (object) {
    const [isOverflowing, setIsOverflowing] = useState(false)
    useEffect(() => {
        if (object.current) {
            const elementRect = object.current.getBoundingClientRect();
            if (elementRect.bottom > window.innerHeight) {
                setIsOverflowing(true)
            }
        }
    }, [])
    return isOverflowing
}