import {Consumer, ConsumerGroup} from "../model/ConsumerGroup";
import {
    Card,
    CardContent,
    Collapse,
    createStyles,
    IconButton,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    makeStyles, Paper,
    Theme,
    Tooltip,
    Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import React, {useState} from "react";
import moment, {Moment} from "moment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(1)
        },
        card: {
            display: 'flex'
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
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        collapse: {
            marginTop: theme.spacing(2)
        }
    })
);


const ConsumerGroupCard: React.FC<{ data: ConsumerGroup }> = (props: { data: ConsumerGroup }) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const getConsumerList = (consumers: Consumer[]) => {
        return (
            <Paper className={classes.paper}>
                <List>
                    {
                        consumers.map(e => {
                            const idle = moment.duration(e.idle);
                            const convertedIdle = idle.minutes() + ":" + idle.seconds();
                            return <ListItem key={e.name}>
                                <ListItemText
                                    primary={"Name: " + e.name}
                                    secondary={"Idle: " + convertedIdle}
                                />
                                <ListItemSecondaryAction>
                                   <Tooltip title="Delete consumer">
                                       <IconButton edge="end" aria-label="delete">
                                           <DeleteIcon />
                                       </IconButton>
                                   </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        })
                    }
                </List>
            </Paper>
        )
    };
    const getFormattedDatetime = (date: Moment): string => moment(date).format("DD/MM/YYYY hh:mm");

    const data: ConsumerGroup = props.data;
    const cardId = 'consumerGroupCardId-' + data.name;

    return (
        <div>
            <Card id={cardId} className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {data.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Consumers: {data.consumers}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Last received ID time: {getFormattedDatetime(data.lastDeliveredIdTime)}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <Tooltip title="Delete group">
                            <IconButton aria-label="previous">
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Show consumers">
                            <IconButton aria-label="play/pause" onClick={() => setOpen(!open)}>
                                <MenuOpenIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </Card>
            <Collapse className={classes.collapse} in={open}>
                {getConsumerList(data.consumersList)}
            </Collapse>
        </div>

    )
};

export default ConsumerGroupCard;