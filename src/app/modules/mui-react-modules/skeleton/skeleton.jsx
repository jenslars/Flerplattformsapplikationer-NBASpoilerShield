// Variants.js
import React, { Component } from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

//Skeleton used for game feed

class Variants extends Component {
    render() {
        return (
            <Stack spacing={1}>
                <Skeleton variant="rounded" width={323} height={79} sx={{ bgcolor: 'grey.800' }} />
                <Skeleton variant="rounded" width={323} height={79} sx={{ bgcolor: 'grey.800' }} />
                <Skeleton variant="rounded" width={323} height={79} sx={{ bgcolor: 'grey.800' }} />
            </Stack>
        );
    }
}

export default Variants;
