import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import base64 from 'base-64';
import history from '../history';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';



const query=`select ?s ?p ?o where{
    GRAPH <http://sandbox.bordercloud.com/groupe7-grapheVcard> 
    {?s ?p ?o} } 
limit 20
`

const useStyles = makeStyles((theme) => ({
cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
},
card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
},
cardMedia: {
    paddingTop: '56.25%', // 16:9
},
cardContent: {
    flexGrow: 1,
},
btnAjouter: {
    'margin-bottom': theme.spacing(3),
},
margin: {
    position: 'fixed',
    bottom: '1%',
    right: '1%',
    'z-index': '9999',
},
}));

function CardsFetchNep() {
    const [results, setResults] = React.useState('');
    const [login, setLogin] = React.useState('ESGI-WEB-2020');
    const [password, setPassword] = React.useState('ESGI-WEB-2020-heUq9f');

    var myHeaders = new Headers();
    var proxy = 'https://safe-scrubland-28636.herokuapp.com/';
    var url = 'https://sandbox.bordercloud.com/sparql';
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('Authorization', 'Basic ' + base64.encode(login + ":" + password));
            
    var urlencoded = new URLSearchParams();
    urlencoded.append("query", query);
            
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };
            
    fetch(proxy+url, requestOptions)
    .then(response => response.text())
    .then(results => { setResults(results.bindings);
        console.log(results)
    })
    .catch(error => console.log('error', error));
        


const classes = useStyles();
const Inconnu = " Inconnu"
const tab = [];
return (
    <React.Fragment>
    <CssBaseline />
    <main>
        <Container className={classes.cardGrid} maxWidth="md">
        <Grid container direction="row" justify="flex-end" alignItems="flex-end">
            <Button href="/artiste/add" className={classes.btnAjouter} variant="contained" size="medium" color="primary">
            Ajouter une femme artiste
            </Button>
        </Grid>
        <Grid container spacing={4}>
            {results.map(({ item, itemLabel, img, dob, placeofbirthLabel }) => (
            <Grid item key={item} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                {!img &&
                <CardMedia
                    className={classes.cardMedia}
                    image="/assets/arts.jpg"
                    title="Image title"
                />
                }
                {img &&
                <CardMedia
                    className={classes.cardMedia}
                    image={img}
                    title="Image title"
                />
                }
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    { itemLabel }
                    </Typography>
                    <Typography>
                    Née à :{!placeofbirthLabel && Inconnu} {placeofbirthLabel} le : {dob.substr(0,10)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button resource={item.substr(31)} onClick= {() =>(history.push(`/detailsAuteur/${item.substr(31)}`))} size="small" color="primary">
                    Regarder les Oeuvres
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Container>
    </main>
    <Fab onClick= {() =>(history.push('/artiste/add'))} color="primary" aria-label="add" className={classes.margin}>
            <AddIcon />
    </Fab>
    </React.Fragment>
);
}
export default CardsFetchNep;
