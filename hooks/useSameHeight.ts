import { useEffect } from 'react';

export default (ref:any) => {
    return useEffect(() => {
        if (ref && ref.current) {
            const listTarget = ref?.current?.children || [];
            if (listTarget.length > 0) {
                let maxHeight = 0;
                for (let target of listTarget) {
                    const heightOfTarget =
                        target.getBoundingClientRect().height;
                    if (heightOfTarget > maxHeight) {
                        maxHeight = heightOfTarget;
                    }
                }

                // Add max height for all children element
                for (let target of listTarget) {
                    target.style.height = `${maxHeight}px`;
                }
            }
        }
    });
};
