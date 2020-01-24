import React from "react";
import {
    Card,
    CardContent,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
    useTheme
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {RootState} from "../app/rootReducer";
import {connect} from "react-redux";
import {ConsumerGroupState} from "../redux/ConsumerGroupInfo";
import moment from "moment";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    })
);


const ConsumerGroup: React.FC<ConsumerGroupState> = (props) => {
    const classes = useStyles();


    const getTimeFromId = (input: string): string => {
        const timeAsMillis = input.split("-")[0];
        return moment(timeAsMillis).format("DD/MM/YYYY HH:mm:ss")
    };

    return (
        <div>
            {
                props.data === null ? null: props.data.map(group => {
                    return (
                        <Card className={classes.card}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        {group.name}
                                    </Typography>
                                    <Tooltip title="Consumers">
                                        <Typography>
                                            {group.consumers}
                                        </Typography>
                                    </Tooltip>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Pending Messages: {group.pendingMessages}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Last received ID time: {group.lastDeliveredIdTime}
                                    </Typography>
                                </CardContent>
                                <div className={classes.controls}>
                                    <IconButton aria-label="previous">
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <MenuOpenIcon/>
                                    </IconButton>
                                </div>
                            </div>

                        </Card>
                    )
                })
            }
        </div>
    );
};

const mapStateToProps = (state: RootState) => state.consumerGroup;

export default connect(mapStateToProps)(ConsumerGroup)