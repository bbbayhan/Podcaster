import { useEffect, useRef, useState } from "react"

export function useFilter() {
    const [filter, setFilter] = useState('')
    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = filter === ''
            return
        }
    }, [filter])

    return { filter, setFilter }
}