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
    },
    heading: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightRegular,
    }
}));

const LatestErrors: React.FC<ErrorState> = (props) => {
    const classes = useStyles();


    console.log(props.data);
    const data: ErrorStreamEntry[] = props.data;
    const isLoading: boolean = props.isLoading;

    const noErrorsToShow = <h1>No error to show</h1>;
    const showErrors = () => {
        if (data.length > 0) {
            let i = 0;
            return data.map(error => {
                return (
                        <ExpansionPanel key={i++}>
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
            })
        } else {
            return noErrorsToShow
        }
    };


    return (
        <div className={classes.root}>
            <h2>Latest errors:</h2>
            {
                isLoading ? <CircularProgress/> : showErrors()
            }
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    const app = {
        errors: state.errors
    };

    return app.errors
};

export default connect(mapStateToProps)(LatestErrors)