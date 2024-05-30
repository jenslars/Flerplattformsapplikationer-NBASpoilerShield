// CustomToolbar.js
import React, { Component } from 'react';
import { Button, Stack } from '@mui/material';

//Custom function for toolbar

class CustomToolbar extends Component {
    render() {
        const { actions } = this.props;
        return (
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    alignItems: "center",
                    p: 2,
                    gridColumn: '1 / 3',
                    gridRow: 3
                }}
            >
                {actions.map((action, index) => (
                    <Button key={index} variant="text" onClick={action.method}>{action.text}</Button>
                ))}
            </Stack>
        );
    }
}

export default CustomToolbar;
