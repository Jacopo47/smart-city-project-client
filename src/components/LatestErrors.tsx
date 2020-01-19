import {createStyles, makeStyles, Theme} from "@material-ui/core";
import React from "react";


export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    }
}));

const LatestErrors: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1>Latest errors</h1>
        </div>
    )
};


export default LatestErrors