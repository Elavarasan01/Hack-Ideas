import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
interface Item {
    title: string;
    description: string;
    tags:string;
    count: number;
    creationDate: Date;
}
const defaultTheme = createTheme();

export const Dashboard = () => {
    const [items, setItems] = React.useState<Item[]>([]);
    const [newItem, setNewItem] = React.useState<{ title: string; description: string; tags:string }>({ title: '', description: '', tags:'' });
    const topFeatures = [
        { title: 'feature', year: 1994 },
        { title: 'tech', year: 1972 },
        { title: 'services', year: 1974 },
        { title: 'solutions', year: 2008 },
        { title: 'clients', year: 1957 },
        { title: "production", year: 1993 },
        { title: 'fiction', year: 1994 }
    ];
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    const handleAddItem = () => {
        if(newItem.title == ''){
            return;
        }
        const newItemWithCount: Item = {
            ...newItem,
            count: 0,
            creationDate: new Date(),
        };
        setItems([...items, newItemWithCount]);
        setOpen(false);
        setNewItem({ title: '', description: '', tags:'' });
    };
    const handleThumbsUp = (index: number) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = { ...updatedItems[index], count: updatedItems[index].count + 1 };
            return updatedItems;
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Challenge Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="outlined" onClick={handleClickOpen}>Add a new Challenge</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {items.map((card, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        <Typography>
                                            {card.description}
                                        </Typography>
                                        <Typography>
                                            {card.tags}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <p>{card.creationDate.toLocaleDateString()}</p>
                                        <Button size='small' onClick={() => handleThumbsUp(index)}><ThumbUpAltIcon />{card.count}</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add a new Challenge"}
                </DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                    <TextField id="outlined-basic" sx={{ margin: 2 }} label="Title" variant="outlined" value={newItem.title}
                        helperText={newItem.title.length === 0 ? "Title Required" : ""}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        sx={{ margin: 2 }}
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    />
                    <Stack spacing={3} sx={{ width: 500 }}>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={topFeatures}
                            getOptionLabel={(option) => option.title}
                            defaultValue={[topFeatures[0]]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Add Tags"
                                    onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                                />
                            )}
                          
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddItem} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}