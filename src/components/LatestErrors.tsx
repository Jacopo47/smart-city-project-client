import {
    CircularProgress,
    createStyles,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import React from "react";
import {connect} from "react-redux";
import {ErrorState} from "../redux/Errors";
import {ErrorStreamEntry} from "../model/ErrorStreamEntry";
import {RootState} from "../app/rootReducer";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from "moment";


export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        fontSize: theme.typography.pxToRem(12)
    },
    container: {
        marginTop: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    heading: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightRegular,
    }
}));

const getErrors = (data: ErrorStreamEntry[], classes: any) => {
    if (data.length === 0) return <h1>No error to show</h1>;

    let i = 0;
    return data.map(error => {
        return (
            <ExpansionPanel className={classes.container} key={i++}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        {moment(error.dateTime).format("DD/MM/YY hh:mm:ss") + ' / ' + error.error.zone}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <p>{error.error.deviceId + ': ' + error.error.errorMsg}</p>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    });
};

const LatestErrors: React.FC<ErrorState> = (props) => {
    const classes = useStyles();
    const isLoading: boolean = props.isLoading;

    return (
        <div className={classes.root}>
            <h2>Latest errors:</h2>
            {
                isLoading ? <CircularProgress/> : getErrors(props.data, classes)
            }
        </div>
    )
};

const mapStateToProps = (state: RootState) => state.errors;
export default connect(mapStateToProps)(LatestErrors)