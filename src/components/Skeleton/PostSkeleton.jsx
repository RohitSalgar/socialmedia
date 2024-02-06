import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import WidgetWrapper from '../WidgetWrapper';

function Media() {
    return (
        <WidgetWrapper m="0.3rem 0">
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                }
                action={null}
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={10} width="40%" />

                }
            />
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

            <CardContent>
                <React.Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
            </CardContent>
        </WidgetWrapper>
    );
}

export default function PostSkeleton() {
    return (
        <div>
            <Media  />
        </div>
    );
}