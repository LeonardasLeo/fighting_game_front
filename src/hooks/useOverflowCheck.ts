import React, {useEffect, useState} from "react";

export default function (object: React.MutableRefObject<HTMLDivElement>) {
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false)
    useEffect(() => {
        if (object) {
            const elementRect = object.current.getBoundingClientRect();
            if (elementRect.bottom > window.innerHeight) {
                setIsOverflowing(true)
            }
        }
    }, [])
    return isOverflowing
}