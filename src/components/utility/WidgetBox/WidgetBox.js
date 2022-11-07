import React from 'react';
import {WidgetBox} from './Widgets.styles';

export default function ({children, style, height, padding}) {
    return (
        <WidgetBox
            className="WidgetBox"
            height={height}
            padding={padding}
            style={style}
        >
            {children}
        </WidgetBox>
    );
}
