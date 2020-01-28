import React from "react";
import {Badge, Container, createStyles, Grid, makeStyles, Paper, Theme} from "@material-ui/core";
import {RootState} from "../app/rootReducer";
import {connect} from "react-redux";
import {ConsumerGroupState} from "../redux/ConsumerGroupInfo";
import ConsumerGroupCard from "./ConsumerGroupCard";


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
        }
    })
);


const ConsumerGroupComponent: React.FC<ConsumerGroupState> = (props) => {
    const classes = useStyles();

    const getGroups = () => {
        return props.data === null ? <h4>No groups to show!</h4> :
            props.data.map(group => {
                const card = <ConsumerGroupCard data={group}/>

                return (
                    <Grid key={group.name} item xs={12} md={3}>
                        <Paper className={classes.paper}>
                            <Badge color="secondary" title="Pending messages" showZero
                                   badgeContent={group.pendingMessages}>
                                {card}
                            </Badge>
                        </Paper>
                    </Grid>
                )
            })
    };

    return (
        <div>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container justify={"center"} spacing={4}>
                    {getGroups()}
                </Grid>
            </Container>
        </div>
    );
};

const mapStateToProps = (state: RootState) => state.consumerGroup;
export default connect(mapStateToProps)(ConsumerGroupComponent)