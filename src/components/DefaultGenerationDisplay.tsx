import * as React from 'react';
import {defaultGeneration} from "../features/types";

const DefaultGenerationDisplay = ({item}: {item: defaultGeneration}) => {
    return (
        <div className='defaultGenerationDisplay'>
            <img src={item.image} alt=""/>
        </div>
    );
};

export default DefaultGenerationDisplay;